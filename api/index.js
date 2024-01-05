const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User.js");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const Place = require("./models/Place.js");
const Booking = require("./models/Booking.js");
const fs = require("fs");
require("dotenv").config();
const app = express();
require("./database.js");
const placeFactory = require("./placeFactory.js").createPlace;

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "fasefraw4r5r3wq45wdfgw34twdfg";

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
// Add logging for image requests
app.use("/uploads", (req, res, next) => {
  console.log("Request for image:", req.url);
  next();
});
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      resolve(userData);
    });
  });
}

//register user
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json("Email already in use");
  }

  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.status(200).json(userDoc);
  } catch (e) {
    console.error(e);
    res.status(500).json("Internal server error");
  }
});

//login user
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });

  if (!userDoc) {
    return res.status(404).json("User not found");
  }

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
    const newName = "photo" + Date.now() + "." + ext;
    const newPath = __dirname + "/uploads/" + newName;

    // Copy the file to the new destination
    fs.copyFileSync(path, newPath);

    // Delete the original file
    fs.unlinkSync(path);

    uploadedFiles.push(newName);
  }

  res.json(uploadedFiles);
});

//add place
app.post("/places", (req, res) => {
  const { token } = req.cookies;
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const place = placeFactory(
      userData.id,
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price
    );
    const placeDoc = await place.save();
    res.json(placeDoc);
  });
});

app.get("/user-places", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const { id } = userData;
    res.json(await Place.find({ owner: id }));
  });
});

app.get("/places/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await Place.findById(id));
});

app.put("/places/", async (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.findById(id);

    if (userData.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      await placeDoc.save();
      res.json("OK");
    }
  });
});

app.get("/places", async (req, res) => {
  res.json(await Place.find());
});

app.post("/bookings", async (req, res) => {
  const userData = await getUserDataFromReq(req);
  const { place, checkIn, checkOut, numberOfGuests, name, phone, price } =
    req.body;
  Booking.create({
    place,
    checkIn,
    checkOut,
    numberOfGuests,
    name,
    phone,
    price,
    user: userData.id,
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      throw err;
    });
});

app.get("/bookings", async (req, res) => {
  const userData = await getUserDataFromReq(req);
  res.json(await Booking.find({ user: userData.id }).populate("place"));
});

// Search places by address
app.get("/search-places", async (req, res) => {
  const { query } = req.query;

  try {
    const results = await Place.find({
      address: { $regex: new RegExp(query, "i") },
    });
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error");
  }
});

const server = app.listen(4000);

module.exports = { app, server };
