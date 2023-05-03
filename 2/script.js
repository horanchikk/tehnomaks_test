import { items } from "./items.js";

const search__input = document.getElementById("search__input");
const search__overlay = document.querySelector(".search__overlay");
const search__overlay__categories = document.querySelector(
  ".search__overlay__categories"
);
const search__overlay__result = document.querySelector(
  ".search__overlay__result"
);

/**
 * Render
 * @param {Object} data
 * @param {Array} data.items
 * @param {Array} data.categories
 */
function render(data) {
  let categoriesRender = [];
  let resultRender = [];

  const countCategory = (name) => {
    return data.categories.filter((el) => {
      return el === name;
    }).length;
  };

  data.categories.forEach((el) => {
    if (
      !categoriesRender.includes(`
      <p class="search__overlay__categories__item">
        ${el} <span class="search__overlay__categories__number">${countCategory(
        el
      )}</span>
      </p>
    `)
    ) {
      categoriesRender.push(`
      <p class="search__overlay__categories__item">
        ${el} <span class="search__overlay__categories__number">${countCategory(
        el
      )}</span>
      </p>
    `);
    }
  });

  data.items.forEach((el) => {
    resultRender.push(`
      <div class="search__overlay__result__item">
        <img
          src="${el.src}"
          alt="${el.name}"
          class="search__overlay__result__item__image"
        />
        <p class="search__overlay__item__name">${el.name}</p>
        <p class="search__overlay__item__price">${el.price} ₽</p>
      </div>
    `);
  });

  search__overlay__categories.innerHTML = categoriesRender.join("");
  search__overlay__result.innerHTML = resultRender.join("");
}

/**
 * Render animations of menu
 * @param {InputEvent} e
 */
function animateMenu(e) {
  e.target.value === ""
    ? search__overlay.setAttribute(
        "style",
        "animation: hide 300ms ease-in-out; animation-fill-mode: forwards;"
      )
    : search__overlay.setAttribute(
        "style",
        "animation: show 300ms ease-in-out; animation-fill-mode: forwards;"
      );
}

/**
 * Find product by name
 * @param {InputEvent} e
 */
function find(e) {
  let result = {
    items: [],
    categories: [],
  };

  animateMenu(e);

  for (const [key, value] of Object.entries(items)) {
    const finded = value.filter((el) => {
      if (el.name.toLowerCase().includes(e.target.value.toLowerCase())) {
        result.categories.push(key);
        return true;
      }
    });
    if (finded.length > 0) {
      result.items = finded;
    }
  }

  if (result.items.length === 0) {
    for (const [key, value] of Object.entries(items)) {
      value.forEach((el) => { result.items.push(el); result.categories.push(key)});
    }
  }

  render(result);
}

search__input.addEventListener("input", find);
