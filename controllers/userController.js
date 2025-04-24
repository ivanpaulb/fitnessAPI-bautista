const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../auth');

exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    await User.create({ email, password: hashed });

    res.status(201).send({ message: "Registered Successfully" });
  }  catch (error) {
    console.error('Error occurred:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    res.json({ access: generateToken(user._id) });
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
};


exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({user: user});
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};