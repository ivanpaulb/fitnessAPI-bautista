const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('./routes/userRoutes');
const workoutRoutes = require('./routes/workoutRoutes');

require('dotenv').config();

const app = express();


mongoose.connect(process.env.MONGODB_STRING);
mongoose.connection.once("open", () => console.log("We're connected to the cloud database"));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const port = 3000;


app.use('/users', userRoutes);
app.use('/workouts', workoutRoutes);

if(require.main === module){
	app.listen(process.env.PORT || port, () => console.log(`Server running at port ${process.env.PORT || port}`));
}

module.exports = {app,mongoose};