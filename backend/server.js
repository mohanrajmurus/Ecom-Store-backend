const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectMongoDB = require("./config/db");
const router = require('./routes/userRoutes')
const app = express();
dotenv.config();
const { PORT, MONGO_URI } = process.env;

//connect database
connectMongoDB(MONGO_URI);
//middleware
app.use(express.json());
app.use(cors());

//routes
app.use('/',router);
//listening port

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  } else console.log(`Server listening on Port ${PORT}`);
});
