const path = require("path");

const express = require("express");

const defaultRoutes = require("./routes/default");
const restaurantRoutes = require("./routes/restaurants");

const app = express();
const port = 3000;

// Specify where the views are located
// Register view engine to be used
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Register in middleware the parsing of the body
// Register in middleware the static files
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/", defaultRoutes);
app.use("/", restaurantRoutes);

app.use((req, res) => {
  res.status(404).render("404", { message: "Sorry! Page not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("500", { message: "Something went wrong!" });
});

// Start the server
app.listen(port);
