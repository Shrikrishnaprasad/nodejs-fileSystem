const express = require("express");
const cors = require("cors");

const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// creating time stamp

let timestamp = Date.now();

let d = new Date();
let filename =
  d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear() + "-";
filename += d.getHours() + "-" + d.getMinutes() + "-" + d.getSeconds();
filename += ".txt";

//console.log(filename);

// creating new file

app.get("/newFile", (request, response) => {
  fs.writeFileSync(`./files/${filename}`, `${timestamp}`, (err) => {
    console.log(err ? err : "Success!");
  });
  response.send(filename);
});

// listing all the files

app.get("/listFiles", (request, response) => {
  fs.readdir("./files/", (err, files) => {
    let list = [];
    files.forEach((file) => {
      console.log(file);
      list.push(file);
    });
    response.send(list);
  });
});

app.listen(PORT, () => console.log("The server is started in: ", PORT));
