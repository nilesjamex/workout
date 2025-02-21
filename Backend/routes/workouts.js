const express = require("express");
const Workouts = require("../controllers/workouts");
const requireAuth = require("../middleware/requireAuth");

const {
  getWorkouts,
  postWorkout,
  getWorkout,
  updateWorkout,
  deleteWorkout,
  checkID,
} = Workouts;

const router = express.Router();

// router.param("id", checkID);

router.use(requireAuth);

router.route("/").get(getWorkouts).post(postWorkout);

router.route("/:id").get(getWorkout).patch(updateWorkout).delete(deleteWorkout);

module.exports = router;
