const express = require('express');
const {
  addWorkout,
  getMyWorkouts,
  updateWorkout,
  deleteWorkout,
  completeWorkout,
} = require('../controllers/workoutController');
const {verifyUser}  = require('../auth');

const router = express.Router();

router.post('/addWorkout', verifyUser, addWorkout);
router.get('/getMyWorkouts', verifyUser, getMyWorkouts);
router.patch('/updateWorkout/:id',verifyUser, updateWorkout);
router.delete('/deleteWorkout/:id', verifyUser, deleteWorkout);
router.patch('/completeWorkoutStatus/:id', verifyUser, completeWorkout);

module.exports = router;
