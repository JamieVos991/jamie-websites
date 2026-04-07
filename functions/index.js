const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({ origin: true }));

app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "Jamievos100@gmail.com",
    pass: "ghdr uwgp wato tagx",
  },
});

// index.js aanpassing
app.post("/", async (req, res) => {
  // Haal alle mogelijke velden uit de body
  const { 
    name, 
    email, 
    phone, 
    company, 
    currentWebsite, 
    message, 
    source, 
    plan 
  } = req.body;

  try {
    await transporter.sendMail({
      from: `"Vos Creative Studio" <Jamievos100@gmail.com>`,
      replyTo: email,
      to: "Jamievos100@gmail.com",
      subject: `Nieuwe aanvraag: ${plan} pakket door ${name}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #000;">Nieuwe aanvraag van de website</h2>
          <hr />
          
          <h3>Persoonlijke gegevens</h3>
          <p><strong>Naam:</strong> ${name}</p>
          <p><strong>E-mail:</strong> ${email}</p>
          <p><strong>Telefoon:</strong> ${phone || "Niet ingevuld"}</p>
          
          <h3>Bedrijfsinformatie</h3>
          <p><strong>Bedrijf:</strong> ${company || "Niet ingevuld"}</p>
          <p><strong>Huidige website:</strong> ${currentWebsite || "Niet ingevuld"}</p>
          <p><strong>Gevonden via:</strong> ${source || "Niet ingevuld"}</p>

          <h3>Project details</h3>
          <p><strong>Gekozen plan:</strong> ${plan}</p>
          <p><strong>Extra info / Bericht:</strong><br />
          ${message ? message.replace(/\n/g, "<br>") : "Geen extra informatie opgegeven."}</p>
          
          <hr />
          <p style="font-size: 0.8em; color: #777;">Dit formulier is verzonden vanaf Vos Creative Studio.</p>
        </div>
      `,
    });

    res.status(200).send("Mail succesvol verzonden");
  } catch (error) {
    console.error("Mail Error:", error);
    res.status(500).send("Er is een fout opgetreden bij het versturen.");
  }
});

exports.sendMail = functions.https.onRequest(app);