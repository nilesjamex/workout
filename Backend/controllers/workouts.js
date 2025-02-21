const Workout = require("../models/workouts");
const mongoose = require("mongoose");

const { title, reps, load } = Workout;

exports.checkID = (req, res, next, val) => {
  const id = req.params.id;

  if (mongoose.Types.ObjectId.IsValid(id)) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  next();
};

exports.getWorkouts = async (req, res) => {
  res.setHeader("Content-Type", "application/json");

  const user_id = req.user._id;

  try {
    const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (error) {
    console.error(error);
  }
};

exports.postWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  try {
    const user_id = req.user._id;
    const workout = await Workout.create({ title, load, reps, user_id });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

  // try {
  //   const workouts = await Workout.find({}).sort({ createdAt: -1 });

  //   if (!workouts) {
  //     return res.status(404).json({ message: "No workouts found" });
  //   }

  //   res.status(200).json(workouts);
  // } catch (err) {
  //   return res
  //     .status(500)
  //     .json({ message: "Error fetching workouts", error: error.message });
  // }
  //   res.send({ mssg: "create workout" });
};

exports.getWorkout = async (req, res) => {
  const id = req.params.id;

  const workout = await mongoose.findById(id);

  if (!workout) {
    return res.status(400).json({ error: "no workout found" });
  }
  res.status(200).json(workout);
};

exports.updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such workout" });
  }

  const workout = await Workout.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!workout) {
    return res.status(400).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
};

exports.deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such workout" });
  }

  const workout = await Workout.findOneAndDelete({ _id: id });

  if (!workout) {
    return res.status(400).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
};
