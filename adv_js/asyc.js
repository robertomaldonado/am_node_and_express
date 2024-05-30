const fs = require("fs");
const { get } = require("http");

function getData() {
  const fileData = fs.readFileSync("./data.txt", "utf8");
  // Equivalent to :
  // const fileData = fs.readFileSync("./data.txt");
  // fileData = fileData.toString()

  console.log(fileData);
  // const data = JSON.parse(fileData);
  // return data;
}

getData();
