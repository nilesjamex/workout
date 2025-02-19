const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const Workouts = require("./routes/workouts");
const Users = require("./routes/userRoutes");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// routes
app.use("/api/workouts", Workouts);
app.use("/api/user", Users);

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
