document.addEventListener("DOMContentLoaded", () => {
  const icons = document.querySelectorAll("h1 .icon");
  icons.forEach((icon, index) => {
    icon.style.animationDelay = `${index * 0.4}s`;
  });
});