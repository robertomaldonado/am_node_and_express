const express = require("express");
const router = express.Router();

const uuid = require("uuid");
const resData = require("../util/restaurant-data");

// Contact page
router.get("/confirm", (req, res) => {
  res.render("confirm");
});

// Recommendation page
router.get("/recommend", (req, res) => {
  res.render("recommend");
});

// Restaurants page
router.get("/restaurants", (req, res) => {
  const restaurants = resData.getStoredRestaurants();
  res.render("restaurants", { restaurants });
});

// Restaurant details page (dynamic)
router.get("/restaurants/:id", (req, res) => {
  const resId = req.params.id;
  const storedRestaurants = resData.getStoredRestaurants();
  const restaurant = storedRestaurants.find((r) => r.id === resId);
  if (restaurant === undefined) {
    return res.status(404).render("404", { message: "Restaurant not found" });
  }
  res.render("restaurant-detail", { restaurant });
});

// Handle the form submission for the recommendation
router.post("/recommend", (req, res) => {
  const restaurant = req.body;
  restaurant.id = uuid.v4();
  resData.storeInRestaurants(restaurant);

  res.redirect("/confirm");
});

module.exports = router;
