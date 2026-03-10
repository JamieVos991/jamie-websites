const form = document.getElementById("contactForm");

// ✅ 1. Check query parameter en vink juiste radio aan
window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const plan = params.get('plan');

  if (plan) {
    const radios = document.querySelectorAll('input[name="plan"]');
    radios.forEach(radio => {
      if (radio.value.toLowerCase() === plan.toLowerCase()) {
        radio.checked = true;
      }
    });
  }
});

// ✅ 2. Form submit functionaliteit
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  const data = {
    email: formData.get("email"),
    name: formData.get("name"),
    plan: formData.get("plan"),
  };

  try {
    await fetch("https://us-central1-vos-creative-studio.cloudfunctions.net/sendMail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    alert("Form verzonden!");
    form.reset(); // optioneel: form leegmaken na verzenden
  } catch (error) {
    console.error(error);
    alert("Er is iets misgegaan bij het verzenden.");
  }
});