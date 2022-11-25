const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const multer = require('multer');
const path = require('path');

app.use(cors());
app.use(express.json());
app.use(express.static("./public"));

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "db",
});

var storage = multer.diskStorage({
  destination: (req, file, callBack) => {
      callBack(null, './public/files/')
  },
  filename: (req, file, callBack) => {
      callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

var upload = multer({
  storage: storage
});

app.put("/put", (req, res) => {
  // req.body
  db.query(
    "UPDATE column SET attribute = ? WHERE id = ?",
    [column, attribute],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  // req.params;
  db.query("DELETE FROM column WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/create-user", (req, res) => {
  // req.body
  db.query(
    "INSERT INTO table (col1, col2, col3, col4) VALUES (?,?,?,?)",
    [col1, col2, col3, col4],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.listen(3001, () => {
  console.log("server running port 3001");
});
