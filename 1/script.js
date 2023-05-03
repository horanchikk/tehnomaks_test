const pageForm = document.querySelector("#pageForm");
const pageForm__input = document.querySelector(".pageForm__input");
const pageForm__text = document.getElementById("pageForm__text");
const text__phone = document.getElementById("text__phone");

/**
 * Check "+" and "+7" number in input
 * @param {InputEvent} input
 */
function inputted(input) {
  input.target.value === "+" ? (input.target.value = "+7") : null;
  input.target.value.slice(0, 2) !== "+7"
    ? (input.target.value = "+7" + input.target.value)
    : null;
}

/**
 * Send form
 * @param {Event} e
 */
function sendForm(e) {
  e.preventDefault();

  const data = new FormData(e.target);
  data.set('phone', data.get('phone').substring(1))

  for (let [key, value] of data) {
    console.log(`${key} - ${value}`);
  }

  pageForm__text.style.display = 'block';
  text__phone.textContent = data.get('phone');
}

pageForm__input.addEventListener("input", inputted);
pageForm.addEventListener("submit", sendForm);
