const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 3000;

// Register in middleware the parsing of the body
app.use(express.urlencoded({ extended: true }));

// Register in middleware the static files
app.use(express.static("public"));

// Routes for the application
app.get("/", (req, res) => {
  let htmlFilePath = path.join(__dirname, "views", "index.html");
  res.sendFile(htmlFilePath);
});

app.get("/about", (req, res) => {
  let htmlFilePath = path.join(__dirname, "views", "about.html");
  res.sendFile(htmlFilePath);
});

app.get("/confirm", (req, res) => {
  let htmlFilePath = path.join(__dirname, "views", "confirm.html");
  res.sendFile(htmlFilePath);
});

app.get("/recommend", (req, res) => {
  let htmlFilePath = path.join(__dirname, "views", "recommend.html");
  res.sendFile(htmlFilePath);
});

app.post("/recommend", (req, res) => {
  const restaurant = req.body;
  const filePath = path.join(__dirname, "data", "restaurants.json");
  const fileData = fs.readFileSync(filePath, "utf8");
  const storedRestaurants = JSON.parse(fileData);

  storedRestaurants.push(restaurant);

  fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));
  res.redirect("/confirm");
});

app.get("/restaurants", (req, res) => {
  let htmlFilePath = path.join(__dirname, "views", "restaurants.html");
  res.sendFile(htmlFilePath);
});

// Start the server
app.listen(port);
