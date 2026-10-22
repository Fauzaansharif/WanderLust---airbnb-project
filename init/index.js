const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initData = require("./data.js");

const dbUrl =
  "mongodb://fauzaansharif102_db_user:7Ah2daZG5eAtEGCQ@ac-k16h0ao-shard-00-00.tyagl5h.mongodb.net:27017,ac-k16h0ao-shard-00-01.tyagl5h.mongodb.net:27017,ac-k16h0ao-shard-00-02.tyagl5h.mongodb.net:27017/?ssl=true&replicaSet=atlas-oas5gt-shard-0&authSource=admin";

async function main() {
  await mongoose.connect(dbUrl);
}

const initDB = async () => {
  const listingsArray = Array.isArray(initData) ? initData : initData.data;

  if (!listingsArray || !Array.isArray(listingsArray)) {
    throw new Error(
      "listingsArray is undefined or not an array. Ensure data.js exports either 'module.exports = { data: [...] }' or 'module.exports = [...]'.",
    );
  }

  await Listing.deleteMany({});

  const cleanListings = listingsArray.map((obj) => ({
    ...obj,
    owner: "6ad92ccb7aca445def7367ef",
  }));

  await Listing.insertMany(cleanListings);
  console.log("Data was initialized successfully");
};

main()
  .then(async () => {
    console.log("Connected to DB");
    await initDB();
    await mongoose.connection.close();
    console.log("Database connection closed");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });
