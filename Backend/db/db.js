const mongoose = require("mongoose");

function connectToDB() {
  mongoose
    .connect(process.env.DB_CONNECT)
    .then(() => {
      console.log("✅ Connected to the database successfully");
    })
    .catch((err) => {
      console.error("❌ Database connection failed:", err);
    });
}


module.exports = connectToDB;
