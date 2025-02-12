const Workout = require("../models/workouts");

const { title, reps, load } = Workout;

exports.checkID = (req, res, next, val) => {
  console.log(`Workout id is: ${val}`);

  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  next();
};

exports.getWorkouts = (req, res) => {
  res.send({ mssg: "get all workouts" });
};

exports.postWorkout = async (req, res) => {
  const { title, reps, load } = req.body;

  try {
    const workout = await Workout.create({ title, reps, load });
    res.status(200).json(workout);
  } catch (err) {
    res.status(400).send({ mssg: "Invalid data sent" });
  }
  //   res.send({ mssg: "create workout" });
};

exports.getWorkout = (req, res) => {
  res.send({ mssg: "get one workout" });
};

exports.updateWorkout = (req, res) => {
  res.send({ mssg: "update workout" });
};

exports.deleteWorkout = (req, res) => {
  res.send({ mssg: "delete workout" });
};
