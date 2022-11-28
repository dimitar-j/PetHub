const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const multer = require('multer');
const path = require('path');
const { profile } = require("console");

app.use(cors());
app.use(express.json());
app.use(express.static("./public"));

const db = mysql.createConnection({
  user: "admin",
  host: "database-1.cqrcinzwgvqv.us-west-2.rds.amazonaws.com",
  port: "61785",
  database: "cpsc471",
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
  var username = req.body.username;
  var password = req.body.password;
  var fname = req.body.fname;
  var lname = req.body.lname;
  var birthday = req.body.birthday;
  var address = req.body.address;
  var profile_photo = req.body.profile_photo;
  db.query(
    "INSERT INTO users (username, password, fname, lname, birthday, address, profile_photo) VALUES (?,?,?,?,?,?,?)",
    [username, password, fname, lname, birthday, address, profile_photo],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        res.send(result);
      }
    }
  );
});

app.listen(3001, () => {
  console.log("server running port 3001");
});
