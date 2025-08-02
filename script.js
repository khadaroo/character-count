// Global
const themeToggleEl = document.querySelector(".theme-toggle");
const textareaEl = document.querySelector(".textarea");
const errorEl = document.querySelector(".error");
const errorMessageEl = document.querySelector(".error-message");
const excludeSpacesEl = document.querySelector(".exclude-spaces-checkbox");
const characterLimitEl = document.querySelector(".option__character-limit");
const readingTimeEl = document.querySelector(".reading-time");
const totalCharactersEl = document.querySelector(".total-characters");
const wordCountEl = document.querySelector(".word-count");
const sentenceCountEl = document.querySelector(".sentence-count");

let characterLimit;
let excludeSpaces;

// DarkMode
const savedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme)").matches;

let theme = savedTheme || (prefersDark ? "dark" : "light");

document.documentElement.setAttribute("data-theme", theme);

function themeToggle() {
  theme =
    document.documentElement.getAttribute("data-theme") === "dark"
      ? "light"
      : "dark";
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

themeToggleEl.addEventListener("click", themeToggle);

// Validation

function validateTextarea(value) {
  const invalidPattern = /[^a-zA-Z0-9.,!?\s]/;

  if (invalidPattern.test(value)) {
    return "Message contains invalid characters";
  } else if (value.length >= characterLimit) {
    return `Limit reached! Your text exceeds ${characterLimit} characters`;
  }

  return "";
}

function renderStats(value) {
  const readingTime = value.length / 200;
  const totalCharacters = excludeSpaces
    ? value.split(" ").filter(Boolean).join("").length
    : String(value.length).padStart(2, "0");

  const wordCount = String(value.split(" ").length).padStart(2, "0");

  const sentenceCount = String(
    value.split(/[.?!]/g).filter(Boolean).length
  ).padStart(2, "0");

  totalCharactersEl.textContent = totalCharacters;
  wordCountEl.textContent = wordCount;
  sentenceCountEl.textContent = sentenceCount;
  readingTimeEl.textContent = `<${Math.round(readingTime)}`;
}

function handleChange() {
  const value = textareaEl.value.trim();

  if (value.length >= characterLimit) {
    textareaEl.maxLength = characterLimit;
  }

  const error = validateTextarea(value);

  if (error) {
    textareaEl.classList.add("error-state");
    errorEl.classList.remove("hidden");
    errorMessageEl.textContent = error;
  } else {
    textareaEl.classList.remove("error-state");
    errorEl.classList.add("hidden");
    errorMessageEl.textContent = error;
  }

  renderStats(value);
}

textareaEl.addEventListener("input", handleChange);
characterLimitEl.addEventListener("change", () => {
  characterLimit = +characterLimitEl.value;

  console.log(characterLimit);
});
excludeSpacesEl.addEventListener("change", () => {
  excludeSpaces = excludeSpacesEl.checked ? true : false;
});
