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
  password: "Qwertypop123*",
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
  db.query(
    "INSERT INTO users (username, password, fname, lname, birthday, address, profile_photo, location, isServiceProvider) VALUES (?,?,?,?,?,?,?,?,?)",
    [req.body.userInfo.username, req.body.userInfo.password, req.body.userInfo.fname, req.body.userInfo.lname, req.body.userInfo.birthday, req.body.userInfo.address, req.body.userInfo.profile_photo, req.body.userInfo.location, req.body.userInfo.isServiceProvider],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/create-item", (req, res) => {
  db.query(
    "INSERT INTO marketplace_items (title, category, description, sellerEmail, price) VALUES (?,?,?,?,?)",
    [req.body.data.title, req.body.data.category, req.body.data.description, req.body.data.sellerEmail, req.body.data.price],
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

app.get("/get-items", (req, res) => {
  db.query("SELECT * FROM marketplace_items", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/create-blog", (req, res) => {
  db.query(
    "INSERT INTO blogs (title, content, photo) VALUES (?,?,?)",
    [req.body.data.title, req.body.data.content, req.body.data.photo],
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

app.get("/get-blogs", (req, res) => {
  db.query("SELECT * FROM blogs", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/create-comment", (req, res) => {
  db.query(
    "INSERT INTO comments (blog_id, user_id, content, fname, lname) VALUES (?,?,?,?,?)",
    [req.body.data.blog_id, req.body.data.user_id, req.body.data.content, req.body.data.fname, req.body.data.lname],
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

app.get("/get-comments", (req, res) => {
  db.query("SELECT * FROM comments WHERE blog_id = ?",
  [req.query.blog_id],
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/login", (req, res) => {
  db.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [req.query.email, req.query.password],
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
