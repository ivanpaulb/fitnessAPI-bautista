const Workout = require('../models/Workout');

exports.addWorkout = async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: 'Please put name and duration values in the request body' });
  }

  const { name, duration } = req.body;
  try {
    const workout = await Workout.create({ name, duration, userId: req.user.id });
    res.status(201).json(workout);
  } catch (error) {
    console.error('Error occurred:', error.message);
    res.status(400).json({ message: 'Invalid workout data' });
  }
};

exports.getMyWorkouts = async (req, res) => {
  const workouts = await Workout.find({ userId: req.user.id });
  res.json({workouts: workouts});
};

exports.updateWorkout = async (req, res) => {
  
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: 'Please put name and duration values in the request body' });
  }

  const { id } = req.params;
  const { name, duration } = req.body;
  const workout = await Workout.findOneAndUpdate(
    { _id: id, userId: req.user.id },
    { name, duration },
    { new: true }
  );
  if (!workout) return res.status(404).json({ error: 'Workout not found' });
  res.json({
    message: "Workout updated successfully",
    updatedWorkout: workout
  });
};

exports.deleteWorkout = async (req, res) => {
  const { id } = req.params;
  const workout = await Workout.findOneAndDelete({ _id: id, userId: req.user.id });
  if (!workout) return res.status(404).json({ error: 'Workout not found' });
  res.json({ message: 'Workout deleted successfully' });
};

exports.completeWorkout = async (req, res) => {
  const { id } = req.params;
  const workout = await Workout.findOneAndUpdate(
    { _id: id, userId: req.user.id },
    { status: 'completed' },
    { new: true }
  );
  if (!workout) return res.status(404).json({ message: 'Workout not found' });
  res.json({
    message: "Workout status updated successfully",
    updatedWorkout: workout
  });
};
