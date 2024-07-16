const navList = document.querySelector(".nav-list");
const header = document.querySelector(".header");
const hero = document.querySelector(".section-hero");
const featuredIn = document.querySelector(".section-featured-in");
const how = document.querySelector(".section-how");
const teachers = document.querySelector(".section-teachers");
const testimonial = document.querySelector(".section-testimonial");
const body = document.querySelector("body");
const btnLeft = document.querySelector(".slider--btn-left");
const btnRight = document.querySelector(".slider--btn-right");
const dotContainer = document.querySelector(".dots");
const pricing = document.querySelector(".section-pricing");
const closeBtn = document.querySelector(".close-modal");
const modalWind = document.querySelector(".modal");
const formBtn = document.querySelector(".btn--form");
const overlay = document.querySelector(".overlay");

(function () {
  let cpr = document.getElementById("copyright");
  cpr.innerHTML =
    "&copy; 2024 - " +
    new Date().getFullYear() +
    " www.Japanses-class.cpm - All Rights Reserved.";
})();

/////////////////Smooth Scrolling/////////

navList.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav-link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }

  if (header.classList.contains("nav-open")) {
    header.classList.remove("nav-open");
  }
});

document.querySelector(".btn--outline").addEventListener("click", function (e) {
  e.preventDefault();
  const id = e.target.getAttribute("href");
  document.querySelector(id).scrollIntoView({ behavior: "smooth" });
});

////////Navigation effect//////////
const handleHover = function (e) {
  if (e.target.classList.contains("nav-link")) {
    const link = e.target;
    const siblings = link.closest(".header").querySelectorAll(".nav-link");
    const logo = link.closest("header").querySelector(".logo");

    siblings.forEach((el) => {
      if (el !== link) {
        el.style.opacity = this;
      }
    });

    logo.style.opacity = this;
  }
};

header.addEventListener("mouseover", handleHover.bind(0.1));

header.addEventListener("mouseout", handleHover.bind(1));

/////////responsive nav buttom//////
const navBtn = document.querySelector(".btn-mobile-nav");
const navOut = document.querySelector('.icon-mobile-nav[name="close-outline"]');
const navBtnClose = document.querySelector(
  '.icon-mobile-nav[name="close-outline"]'
);

navBtn.addEventListener("click", function () {
  header.classList.toggle("nav-open");

  // if (header.classList.contains("nav-open")) {
  //   const navBtnPos = navOut.getBoundingClientRect();
  //   console.log(navBtnPos);
  //   const navBtnTop = navBtnPos.top;
  //   const navBtnLeft = navBtnPos.left;
  //   console.log(navBtnTop, navBtnLeft);
  //   console.log(navBtnClose);
  //   navBtnClose.style.top = `${Number(navBtnTop)}px`;
  //   navBtnClose.style.left = `${Number(navBtnLeft)}px`;
  // }
});

///////Sticky Navigation///////////

// const initialCoord = featuredIn.getBoundingClientRect();
// console.log(initialCoord);

// window.addEventListener("scroll", function () {
//   if (window.scrollY > initialCoord.top) header.classList.add("sticky");
//   else header.classList.remove("sticky");
// });

///////// Sticky navigation: Intersection Observer API///////////

const navHeight = header.getBoundingClientRect().height;
console.log(navHeight);

const stickyNav = function (entries) {
  const [entry] = entries;
  //   console.log(entry);
  if (!entry.isIntersecting) body.classList.add("sticky");
  else body.classList.remove("sticky");
};

const heroObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

heroObserver.observe(hero);

///////////////Remove sections/////////////////////

const allsections = [featuredIn, how, teachers, testimonial, pricing];

const revealSection = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section-hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allsections.forEach((se) => {
  sectionObserver.observe(se);
  se.classList.add("section-hidden");
});

/////////////////Slider//////////////////////
const slids = document.querySelectorAll(".slide");
let curSlide = 0;
const maxSlide = slids.length;
const minSlide = 0;
const mediaQuerySm = window.matchMedia("(max-width:579px)");
const mediaQuetyMd = window.matchMedia("(max-width:580px)");

// const handleResizeChange = function(e){
//   if(e.ma)
// }

mediaQuetyMd.addEventListener("change", function () {
  curSlide = 0;
  goToSlide(0);
  activeDot(0);
});

mediaQuerySm.addEventListener("change", function () {
  removeTransform();
});

const removeTransform = () => {
  slids.forEach((s) => s.style.removeProperty("transform"));
};

const createDots = function () {
  slids.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `
        <button class="dot" data-slide="${i}"></button>`
    );
  });
};

function goToSlide(slide) {
  if (window.innerWidth <= 580) return;
  slids.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
}

const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
  activeDot(curSlide);
};

const prevSlide = function () {
  if (curSlide === minSlide) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }

  goToSlide(curSlide);
  activeDot(curSlide);
};

const activeDot = function (slide) {
  dot.forEach((dot) => dot.classList.remove("dot--active"));

  document
    .querySelector(`.dot[data-slide="${slide}"]`)
    .classList.add("dot--active");
};

//at the bniggining go to slide
createDots();
const dot = document.querySelectorAll(".dot");

goToSlide(0);
activeDot(0);

btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);

document.addEventListener("keydown", function (e) {
  console.log(e);
  e.key === "ArrowRight" && nextSlide();
  e.key === "ArrowLeft" && prevSlide();
});

dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dot")) {
    const slide = e.target.dataset.slide;

    curSlide = Number(slide);
    goToSlide(slide);
    activeDot(slide);
  }
});

////////////////Modal window////////////////////

const openModal = function () {
  overlay.classList.remove("hidden");
  modalWind.classList.remove("hidden");
};

const closeModal = function () {
  overlay.classList.add("hidden");
  modalWind.classList.add("hidden");
};

closeBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
formBtn.addEventListener("click", openModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modalWind.classList.contains("hidden")) {
    closeModal();
  }
});

////////////////////////////////////////
