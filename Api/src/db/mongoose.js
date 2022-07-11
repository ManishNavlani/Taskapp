const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URL, (err) => {
  if (!err) {
    console.log("MongoDB Connection Succeeded.");
  } else {
    console.log("Error in DB connection: " + err);
  }
});
