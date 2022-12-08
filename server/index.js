const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const { profile } = require("console");
var crypto = require("crypto");
var shasum = crypto.createHash("sha1");

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

app.post("/create-user", (req, res) => {
  db.query(
    "INSERT INTO users (username, password, fname, lname, birthday, address, profile_photo, location, isServiceProvider) VALUES (?,?,?,?,?,?,?,?,?)",
    [
      req.body.userInfo.username,
      crypto
        .createHash("sha1")
        .update(req.body.userInfo.password)
        .digest("hex"),
      req.body.userInfo.fname,
      req.body.userInfo.lname,
      req.body.userInfo.birthday,
      req.body.userInfo.address,
      req.body.userInfo.profile_photo,
      req.body.userInfo.location,
      req.body.userInfo.isServiceProvider,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/login", (req, res) => {
  db.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [
      req.query.email,
      crypto.createHash("sha1").update(req.query.password).digest("hex"),
    ],
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
    "INSERT INTO marketplace_items (title, category, description, sellerEmail, user_id, price) VALUES (?,?,?,?,?,?)",
    [
      req.body.data.title,
      req.body.data.category,
      req.body.data.description,
      req.body.data.sellerEmail,
      req.body.data.user_id,
      req.body.data.price,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
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
    "INSERT INTO blogs (title, content, photo, user_id) VALUES (?,?,?,?)",
    [
      req.body.data.title,
      req.body.data.content,
      req.body.data.photo,
      req.body.data.user_id,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
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
    [
      req.body.data.blog_id,
      req.body.data.user_id,
      req.body.data.content,
      req.body.data.fname,
      req.body.data.lname,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/get-comments", (req, res) => {
  db.query(
    "SELECT * FROM comments WHERE blog_id = ?",
    [req.query.blog_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/create-animal", (req, res) => {
  db.query(
    "INSERT INTO animals (user_id, title, description, providerEmail, breed, providerName, location, price, image) VALUES (?,?,?,?,?,?,?,?,?)",
    [
      req.body.user_id,
      req.body.title,
      req.body.description,
      req.body.providerEmail,
      req.body.breed,
      req.body.providerName,
      req.body.location,
      req.body.price,
      req.body.image,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/get-animals", (req, res) => {
  db.query(
    "SELECT *, BIN_TO_UUID(animal_id, true) AS animal_id FROM animals",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/create-vet", (req, res) => {
  db.query(
    "INSERT INTO certifications (certLink, certExpDate, issuer) VALUES (?,?,?)",
    [req.body.certLink, req.body.certExpDate, req.body.issuer],
    (err, result1) => {
      if (err) {
        console.log(err);
      } else {
        db.query(
          "INSERT INTO vets (user_id, title, location, certification_id) VALUES (?,?,?,?)",
          [
            req.body.user_id,
            req.body.title,
            req.body.location,
            result1.insertId,
          ],
          (err, result2) => {
            if (err) {
              console.log(err);
            } else {
              res.send(result2);
            }
          }
        );
      }
    }
  );
});

app.get("/get-vets", (req, res) => {
  db.query(
    "SELECT *, BIN_TO_UUID(vet_id, true) AS vet_id FROM vets",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/create-casualservice", (req, res) => {
  console.log(req.body);
  db.query(
    "INSERT INTO casualservices (user_id, title, description, providerEmail, providerName, location, price) VALUES (?,?,?,?,?,?,?)",
    [
      req.body.user_id,
      req.body.title,
      req.body.description,
      req.body.providerEmail,
      req.body.providerName,
      req.body.location,
      req.body.price,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/get-casualservices", (req, res) => {
  db.query(
    "SELECT *, BIN_TO_UUID(casualservice_id, true) AS casualservice_id FROM casualservices",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/get-mycasualservices", (req, res) => {
  db.query(
    "SELECT *, BIN_TO_UUID(casualservice_id, true) AS casualservice_id FROM casualservices WHERE user_id = ?",
    [req.query.user_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/get-myvets", (req, res) => {
  db.query(
    "SELECT *, BIN_TO_UUID(vet_id, true) AS vet_id FROM vets WHERE user_id = ?",
    [req.query.user_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/get-myanimals", (req, res) => {
  db.query(
    "SELECT *, BIN_TO_UUID(animal_id, true) AS animal_id FROM animals WHERE user_id = ?",
    [req.query.user_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/create-review", (req, res) => {
  console.log(req.body);
  db.query(
    "INSERT INTO reviews (service_uuid, rating, content, fname, lname) VALUES (?,?,?,?,?)",
    [
      req.body.service_uuid,
      req.body.rating,
      req.body.content,
      req.body.fname,
      req.body.lname,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/get-reviews", (req, res) => {
  db.query(
    "SELECT * FROM reviews WHERE service_uuid = ?",
    [req.query.service_uuid],
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
