const express = require("express");
const fs = require("fs");
const ejs = require("ejs");
const path = require("path");
const app = express();
const port = 3000;

// Register in middleware the parsing of the body
app.use(express.urlencoded({ extended: true }));

// Register in middleware the static files
app.use(express.static("public"));

// Specify where the views are located
app.set("views", path.join(__dirname, "views"));
// Register view engine to be used
app.set("view engine", "ejs");

// Routes for the application
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/confirm", (req, res) => {
  res.render("confirm");
});

app.get("/recommend", (req, res) => {
  res.render("recommend");
});

app.get("/restaurants", (req, res) => {
  const filePath = path.join(__dirname, "data", "restaurants.json");
  const fileData = fs.readFileSync(filePath, "utf8");
  const storedRestaurants = JSON.parse(fileData);
  res.render("restaurants", { restaurants: storedRestaurants });
});

// Handle the form submission for the recommendation
app.post("/recommend", (req, res) => {
  const restaurant = req.body;
  const filePath = path.join(__dirname, "data", "restaurants.json");
  const fileData = fs.readFileSync(filePath, "utf8");
  const storedRestaurants = JSON.parse(fileData);

  storedRestaurants.push(restaurant);

  fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));
  res.redirect("/confirm");
});

// Start the server
app.listen(port);
