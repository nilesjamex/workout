const Workout = require("../models/workouts");

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
  try {
    const workouts = await Workout.find({}).sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (error) {
    console.error(error);
  }
};

exports.postWorkout = async (req, res) => {
  const { title, reps, load } = req.body;

  try {
    const workouts = await Workout.find({}).sort({ createdAt: -1 });

    if (!workouts) {
      return res.status(404).json({ message: "No workouts found" });
    }

    res.status(200).json(workouts);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error fetching workouts", error: error.message });
  }
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
  const id = req.params.id;

  const workout = await mongoose.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!workout) {
    return res.status(400).json({ error: "no workout found" });
  }
  res.status(200).json(workout);
};

exports.deleteWorkout = async (req, res) => {
  const id = req.params.id;

  const workout = await mongoose.findOneAndDelete({ _id: id });

  if (!workout) {
    return res.status(400).json({ error: "no workout found" });
  }
  res.status(200).json(workout);
};
