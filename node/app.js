const http = require("http");

function requestHandler(req, res) {
  if (req.url === "/time") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end("<h3>" + new Date().toISOString() + "</h3>");
  } else if (req.url === "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end("<h3>Hello, World!</h3>");
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html");
    res.end("<h3>404 Not Found</h3>");
  }
}

const server = http.createServer(requestHandler);

server.listen(3000, "localhost", () => {
  console.log("Server is running on http://localhost:3000");
});
