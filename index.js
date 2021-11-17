require("dotenv").config();
const express = require("express");
const formidable = require("express-formidable");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const cors = require("cors");

mongoose.connect(process.env.MONGO_DB_URI);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(cors());
app.use(formidable());

// Requête COMICS ============================
// Je créé une constante getComics qui va venir faire une requête axios vers l'API MARVEL du Réacteur, afin de récupérer la liste en json des comics
const getComics = async () => {
  // Il s'agit d'une fonction async : il faut donc un try / catch
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.API_KEY}`
    );
    getComics(response.data);
  } catch (error) {
    console.error(error.message);
  }
};

app.get("/comics", (req, res) => {
  console.log(getComics);
  res.send("MARVEL !");
});

// Lancement du serveur ========================
app.listen(process.env.PORT, () => {
  console.log("Server has started");
});

app.all("*", (request, response) => {
  response.json({ message: "Page not found" });
});
