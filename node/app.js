const express = require("express");
const app = express();
const port = 3000;

app.get("/time", (req, res) => {
  responseHtml =
    "<h3>Current time is: " + new Date().toLocaleTimeString() + "</h3>";
  res.send(responseHtml);
});

app.get("/", (req, res) => {
  res.send("<h3>Try '/time' endpoint</h3>");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
