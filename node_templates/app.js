const fs = require("fs");
const ejs = require("ejs");
const path = require("path");

const express = require("express");
const uuid = require("uuid");

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

// About page
app.get("/about", (req, res) => {
  res.render("about");
});

// Contact page
app.get("/confirm", (req, res) => {
  res.render("confirm");
});

// Recommendation page
app.get("/recommend", (req, res) => {
  res.render("recommend");
});

// Restaurants page
app.get("/restaurants", (req, res) => {
  const filePath = path.join(__dirname, "data", "restaurants.json");
  const fileData = fs.readFileSync(filePath, "utf8");
  const storedRestaurants = JSON.parse(fileData);
  res.render("restaurants", { restaurants: storedRestaurants });
});

// Restaurant details page (dynamic)
app.get("/restaurants/:id", (req, res) => {
  const resId = req.params.id;
  const filePath = path.join(__dirname, "data", "restaurants.json");
  const fileData = fs.readFileSync(filePath, "utf8");
  const storedRestaurants = JSON.parse(fileData);
  const restaurant = storedRestaurants.find((r) => r.id === resId);
  if (restaurant === undefined) {
    return res.status(404).render("404", { message: "Restaurant not found" });
  }
  res.render("restaurant-detail", { restaurant });
});

// Handle the form submission for the recommendation
app.post("/recommend", (req, res) => {
  const restaurant = req.body;
  restaurant.id = uuid.v4();

  const filePath = path.join(__dirname, "data", "restaurants.json");
  const fileData = fs.readFileSync(filePath, "utf8");
  const storedRestaurants = JSON.parse(fileData);

  storedRestaurants.push(restaurant);

  fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));
  res.redirect("/confirm");
});

app.use((req, res) => {
  res.status(404).render("404", { message: "Sorry! Page not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("500", { message: "Something went wrong!" });
});

// Start the server
app.listen(port);
