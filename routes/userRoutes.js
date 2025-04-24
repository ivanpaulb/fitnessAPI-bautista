const express = require('express');
const { register, login, getUserDetails } = require('../controllers/userController');
const {verifyUser}  = require('../auth');

const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.get('/details', verifyUser, getUserDetails);

module.exports = router;