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

app.post("/sendMail", async (req, res) => {
  const { email, name, plan } = req.body;

  try {
    await transporter.sendMail({
      from: email,
      to: "Jamievos100@gmail.com",
      subject: "Nieuwe aanvraag",
      html: `
        <h2>Nieuwe aanvraag</h2>
        <p>Naam: ${name}</p>
        <p>Email: ${email}</p>
        <p>Plan: ${plan}</p>
      `,
    });

    res.status(200).send("Mail verzonden");
  } catch (error) {
    console.error(error);
    res.status(500).send(error.toString());
  }
});

exports.sendMail = functions.https.onRequest(app);