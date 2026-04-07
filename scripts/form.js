const form = document.getElementById("contact-form");
const loader = document.getElementById("loader-overlay");

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
  e.preventDefault();

  // 1. Toon de loader overlay
  loader.classList.add("active");

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch("https://sendmail-qajpsptcka-uc.a.run.app", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      // 2. Verberg de loader (optioneel, maar netjes voor de alert verschijnt)
      loader.classList.remove("active");

      // 3. Toon de melding aan de gebruiker
      alert("Bedankt! Je aanvraag is succesvol verzonden. We nemen zo snel mogelijk contact met je op.");

      // 4. Pas NA de alert redirecten naar de homepagina
      window.location.href = "index.html";
    } else {
      throw new Error("Server reageerde niet goed.");
    }
  } catch (error) {
    console.error("Fetch error:", error);
    
    // Verberg loader zodat de gebruiker het opnieuw kan proberen
    loader.classList.remove("active");
    alert("Er is iets misgegaan bij het verzenden. Controleer je internetverbinding of probeer het later opnieuw.");
  }
});