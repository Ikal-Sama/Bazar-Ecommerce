const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database Connected Succesfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { dbConnect };
