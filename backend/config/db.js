const mongoose = require("mongoose");

const connectMongoDB = (uri) => {
  mongoose.set('strictQuery', true);
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB Connected Sucessfully"))
    .catch((err) => console.error(err));
};

module.exports = connectMongoDB;
