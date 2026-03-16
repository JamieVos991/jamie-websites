const themeToggle = document.getElementById("theme-toggle");

const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
document.body.classList.add(prefersDark ? "dark-mode" : "light-mode");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");
});