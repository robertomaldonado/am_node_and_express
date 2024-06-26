const fs = require("fs");
const path = require("path");

const express = require("express");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.get("/time", (req, res) => {
  responseHtml =
    "<h3>Current time is: " + new Date().toLocaleTimeString() + "</h3>";
  res.send(responseHtml);
});

app.get("/users", (req, res) => {
  const filePath = path.join(__dirname, "data", "users.json");
  const fileData = fs.readFileSync(filePath, "utf8");
  const users = JSON.parse(fileData);

  let responseData = "Users: <ul>";
  for (let user of users) {
    responseData += "<li>" + user + "</li>";
  }
  responseData += "</ul>";

  res.send(responseData);
});

app.get("/", (req, res) => {
  const nameForm =
    "<form action='/store-user' method='post'><label>Name</label><input type='text' name='username'/><button type='submit'>Submit</button></form>";
  res.send(nameForm);
});

app.post("/store-user", (req, res) => {
  let userMsg = "Successfully stored user: ";
  const username = req.body.username;
  const filePath = path.join(__dirname, "data", "users.json");

  // Read current users
  const fileData = fs.readFileSync(filePath, "utf8");
  const users = JSON.parse(fileData);
  users.push(username);
  // Save updatged users
  fs.writeFileSync(filePath, JSON.stringify(users));
  res.send("<h3>" + userMsg + username + "</h3>");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
