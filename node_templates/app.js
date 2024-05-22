const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  let htmlFilePath = path.join(
    __dirname,
    "frontend-site",
    "views",
    "index.html"
  );
  res.sendFile(htmlFilePath);
});

app.get("/about", (req, res) => {
  let htmlFilePath = path.join(
    __dirname,
    "frontend-site",
    "views",
    "about.html"
  );
  res.sendFile(htmlFilePath);
});

app.get("/confirm", (req, res) => {
  let htmlFilePath = path.join(
    __dirname,
    "frontend-site",
    "views",
    "confirm.html"
  );
  res.sendFile(htmlFilePath);
});

app.get("/recommend", (req, res) => {
  let htmlFilePath = path.join(
    __dirname,
    "frontend-site",
    "views",
    "recommend.html"
  );
  res.sendFile(htmlFilePath);
});

app.get("/restaurants", (req, res) => {
  let htmlFilePath = path.join(
    __dirname,
    "frontend-site",
    "views",
    "restaurants.html"
  );
  res.sendFile(htmlFilePath);
});

app.listen(port);
