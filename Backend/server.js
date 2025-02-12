const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const Workouts = require("./routes/workouts");

const app = express();

app.use(express.json());

// routes
app.use("/api/workouts", Workouts);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(3000, () => {
      const port = process.env.PORT || 3000;
      console.log(`App running on port ${port}... and connected to db`);
    });
  })
  .catch(() => {
    console.log("error connecting to db");
  });

// listen to server
