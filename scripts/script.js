  document.addEventListener("DOMContentLoaded", () => {
    const icons = document.querySelectorAll(".h1-font .icon");
    icons.forEach((icon, index) => {
      icon.style.animationDelay = `${index * 0.4}s`;
    });
  });