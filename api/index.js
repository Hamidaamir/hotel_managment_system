const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User.js");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");
require("dotenv").config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "fasefraw4r5r3wq45wdfgw34twdfg";

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

//database connection
mongoose
  .connect("mongodb://0.0.0.0:27017/resortsConnect", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
    console.log("Connection Failed");
  });

app.get("/test", (req, res) => {
  res.json("test ok");
});

//register user
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

//login user
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        { email: userDoc.email, id: userDoc._id },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.status(422).json("Pass Not Ok");
    }
  } else {
    res.json("not found");
  }
});

//profile
app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) {
        res.status(401).json("Authentication failed");
        return;
      }
      try {
        const user = await User.findById(userData.id);
        if (user) {
          const { name, email, _id } = user;
          res.json({ name, email, _id });
        } else {
          res.status(404).json("User not found");
        }
      } catch (error) {
        res.status(500).json("Internal server error");
      }
    });
  } else {
    res.status(401).json("Authentication required");
  }
});

//logout
app.post("/logOut", (req, res) => {
  res.cookie("token", "").json(true);
});

//upload photos through link
app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;

  // Check if the link starts with 'data:' indicating a data URI
  if (link.startsWith("data:")) {
    // Handle data URI differently, for example, decode and save it
    const base64Data = link.split(";base64,").pop();
    const newName = "photo" + Date.now() + ".jpeg";

    fs.writeFileSync(__dirname + "/uploads/" + newName, base64Data, {
      encoding: "base64",
    });

    res.json(newName);
  } else {
    // Handle normal URL using image-downloader
    try {
      const newName = "photo" + Date.now() + ".jpeg";
      await imageDownloader.image({
        url: link,
        dest: __dirname + "/uploads/" + newName,
      });
      res.json(newName);
    } catch (error) {
      res.status(500).json("Error downloading image");
    }
  }
});

//upload photos through upload button
const photosMiddleware = multer({ dest: "uploads/" });
app.post("/upload", photosMiddleware.array("photos", 100), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads/", ""));
  }
  res.json(uploadedFiles);
});

app.listen(4000);
