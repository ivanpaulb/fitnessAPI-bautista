const jwt = require('jsonwebtoken');


const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        console.error('Error occurred:', error.message);
        return reject({ status: 401, message: 'Invalid or expired token' });
      }
      resolve(decoded);
    });
  });
};

const verifyUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token not provided' });

  try {
    const decoded = await verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(error.status || 401).json({ message: error.message || 'Unauthorized' });
  }
};


module.exports = {
  verifyUser,
  generateToken,
};  