const fs = require("fs");
const path = require("path");

function getStoredRestaurants() {
  const filePath = path.join(__dirname, "..", "data", "restaurants.json");
  const fileData = fs.readFileSync(filePath, "utf8");
  const storedRestaurants = JSON.parse(fileData);
  return storedRestaurants;
}

function storeInRestaurants(restaurant) {
  const storedRestaurants = getStoredRestaurants();
  storedRestaurants.push(restaurant);
  fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));
}

module.exports = {
  getStoredRestaurants: getStoredRestaurants,
  storeInRestaurants: storeInRestaurants,
};
