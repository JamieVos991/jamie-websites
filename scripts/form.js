const form = document.getElementById("contact-form");

// Wacht tot de DOM volledig geladen is
window.addEventListener('DOMContentLoaded', () => {
  // Haal query parameters uit de URL (bijv: ?plan=basic)
  const params = new URLSearchParams(window.location.search);
  const plan = params.get('plan');

  // Als er een plan in de URL zit
  if (plan) {
    // Selecteer alle radio buttons met name="plan"
    const radios = document.querySelectorAll('input[name="plan"]');

    // Loop door alle radio buttons
    radios.forEach(radio => {
      // Check of de value overeenkomt met de plan parameter (case-insensitive)
      if (radio.value.toLowerCase() === plan.toLowerCase()) {
        // Zet deze radio button als geselecteerd
        radio.checked = true;
      }
    });
  }
});

form.addEventListener("submit", async (e) => {
  // Voorkom standaard form submit (page reload)
  e.preventDefault();

  // Maak een FormData object van het formulier
  const formData = new FormData(form);

  // Zet de benodigde data in een object
  const data = {
    email: formData.get("email"),
    name: formData.get("name"),
    plan: formData.get("plan"),
  };

  try {
    // Verstuur de data naar de backend (Firebase)
    await fetch("https://us-central1-vos-creative-studio.cloudfunctions.net/sendMail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // Feedback voor gebruiker
    alert("Form verzonden!");

    // Reset het formulier
    form.reset();
  } catch (error) {
    // Log error in console voor debugging
    console.error(error);

    // Feedback voor gebruiker bij fout
    alert("Er is iets misgegaan bij het verzenden.");
  }
});