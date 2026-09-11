// script.js

const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

/* CURSOR */

const cursor = $(".cursor");
const dot = $(".cursor-dot");

window.addEventListener("mousemove", (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;

  dot.style.left = `${e.clientX}px`;
  dot.style.top = `${e.clientY}px`;
});

$$("a,button,.product-card").forEach(el => {
  el.addEventListener("mouseenter", () => {
    cursor.style.width = "65px";
    cursor.style.height = "65px";
  });

  el.addEventListener("mouseleave", () => {
    cursor.style.width = "38px";
    cursor.style.height = "38px";
  });
});


/* SEARCH */

const searchOverlay = $("#searchOverlay");
const searchBtn = $("#searchBtn");
const closeSearch = $("#closeSearch");

searchBtn.addEventListener("click", () => {
  searchOverlay.classList.add("open");

  setTimeout(() => {
    searchOverlay.querySelector("input").focus();
  }, 500);
});

closeSearch.addEventListener("click", () => {
  searchOverlay.classList.remove("open");
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    searchOverlay.classList.remove("open");
  }
});


/* FILTER */

const filterButtons = $$(".filter-bar button");
const products = $$(".product-card");

filterButtons.forEach(button => {

  button.addEventListener("click", () => {

    filterButtons.forEach(btn => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    const category = button.textContent.trim();

    products.forEach(product => {

      const name =
        product.querySelector("h3").textContent.toLowerCase();

      let show = true;

      if (category === "TEES") {
        show = name.includes("tee");
      }

      if (category === "BOTTOMS") {
        show = name.includes("pants");
      }

      if (category === "OUTERWEAR") {
        show = name.includes("hoodie");
      }

      product.style.display = show ? "" : "none";
    });

  });

});


/* SCROLL REVEAL */

const revealItems = [
  ...$$(".statement-text"),
  ...$$(".product-card"),
  ...$$(".culture-copy"),
  ...$$(".culture-art"),
  ...$$(".final-cta")
];

revealItems.forEach(el => {
  el.classList.add("reveal");
});

const observer = new IntersectionObserver(
  entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }

    });

  },
  {
    threshold:.12
  }
);

revealItems.forEach(el => observer.observe(el));


/* PARALLAX */

window.addEventListener("scroll", () => {

  const scroll = window.scrollY;
  const orbit = $(".hero-orbit");
  const heroTitle = $(".hero-title");

  if (scroll < window.innerHeight * 1.2) {

    orbit.style.transform =
      `translateY(calc(-50% + ${scroll * .12}px)) rotate(${scroll * .025}deg)`;

    heroTitle.style.transform =
      `translateY(${scroll * .08}px)`;

  }

});


/* PRODUCT MAGNETIC EFFECT */

products.forEach(card => {

  card.addEventListener("mousemove", e => {

    const rect = card.getBoundingClientRect();

    const x =
      (e.clientX - rect.left - rect.width / 2) / 25;

    const y =
      (e.clientY - rect.top - rect.height / 2) / 25;

    card.style.transform =
      `perspective(900px) rotateX(${-y}deg) rotateY(${x}deg)`;

  });

  card.addEventListener("mouseleave", () => {

    card.style.transform =
      "perspective(900px) rotateX(0) rotateY(0)";

  });

});


/* SMOOTH ANCHOR */

$$('a[href^="#"]').forEach(link => {

  link.addEventListener("click", e => {

    const target = document.querySelector(
      link.getAttribute("href")
    );

    if (!target) return;

    e.preventDefault();

    target.scrollIntoView({
      behavior:"smooth",
      block:"start"
    });

  });

});


/* HERO MOUSE MOVEMENT */

const hero = $(".hero");

hero.addEventListener("mousemove", e => {

  const x =
    (e.clientX / window.innerWidth - .5) * 20;

  const y =
    (e.clientY / window.innerHeight - .5) * 20;

  $(".hero-grid").style.transform =
    `translate(${x}px,${y}px)`;

  $(".orbit-core").style.transform =
    `translate(${x * .7}px,${y * .7}px)`;

});


/* PREVENT SEARCH FORM ISSUES */

const searchInput = $(".search-inner input");

searchInput.addEventListener("keydown", e => {

  if (e.key === "Enter") {

    const value = searchInput.value.trim();

    if (value) {
      searchInput.value = "";
      searchInput.placeholder =
        `SEARCHING: ${value.toUpperCase()}`;
    }

  }

});