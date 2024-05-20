const express = require("express");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.get("/time", (req, res) => {
  responseHtml =
    "<h3>Current time is: " + new Date().toLocaleTimeString() + "</h3>";
  res.send(responseHtml);
});

app.get("/", (req, res) => {
  const nameForm =
    "<form action='/store-user' method='post'><label>Name</label><input type='text' name='username'/><button type='submit'>Submit</button></form>";
  res.send(nameForm);
});

app.post("/store-user", (req, res) => {
  let userMsg = "Successfully stored user: ";
  const username = req.body.username;
  res.send("<h3>" + userMsg + username + "</h3>");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
