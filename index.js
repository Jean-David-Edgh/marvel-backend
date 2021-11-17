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

// Lancement du serveur ========================
app.listen(process.env.PORT, () => {
  console.log("Server has started");
});

app.all("*", (request, response) => {
  response.json({ message: "Page not found" });
});
