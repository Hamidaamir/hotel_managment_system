// database.js
const mongoose = require("mongoose");

class Database {
  constructor() {
    this._connect();
  }

  _connect() {
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
  }
}

module.exports = new Database();
