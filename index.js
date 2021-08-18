const express = require("express");
const path = require("path");
const sendgrid = require("./helpers/sendgrid");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/assets", express.static(path.join(__dirname, "assets")));

app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/contact", async (req, res) => {
  const { name, email, text } = req.body;
  if (!name || !email || !text) {
    throw new Error("Please fill all fields");
  }
  const template = path.join(__dirname, "views", "contact.hbs");
  const templateData = {
    file: template,
  };
  await sendgrid.sendMail({
    from: {
      name: 'King Etiosasere',
      email: 'iyosa14@gmail.com'
    },
    to: {
      name,
      email
    },
    subject: "Thank you for contacting me",
    templateData,
  });
  res.json({ message: "Message receieved" });
});

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log("Server listening"));
