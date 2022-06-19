const generateToken = require('./generateToken');

const authMiddleware = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).end();

  const token = generateToken();
  
  req.token = { token };

  next();
};

module.exports = authMiddleware;