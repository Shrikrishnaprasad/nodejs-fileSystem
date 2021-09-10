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

app.get("/", (request, response) => {
  response.send(
    "<h1>FileSystem with timestamp <br/> <br/>Create - /newFile,<br/> List - /listFiles</h1>"
  );
});

// creating new file

app.get("/newFile", async (request, response) => {
  await fs.writeFileSync(`./files/${filename}`, `${timestamp}`, (err) => {
    console.log(err ? err : "Success!");
  });
  // console.log(filename);
  response.send(filename);
});

// listing all the files

app.get("/listFiles", (request, response) => {
  fs.readdir("./files/", async (err, files) => {
    let list = [];
    await files.forEach((file) => {
      console.log(file);
      list.push(file);
    });
    response.send(list.map((file) => file));
  });
});

app.listen(PORT, () => console.log("The server is started in: ", PORT));
