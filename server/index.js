const express = require("express");
const app = express();
const port = 5000;
const mongoose = require("mongoose");
const router = require("./routes/userRoute");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Middleware
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/api", router);

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Connected to MongoDB");
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
