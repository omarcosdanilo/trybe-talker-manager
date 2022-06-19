const generateToken = require('./generateToken');

const INVALID_EMAIL_MESSAGE = 'O "email" deve ter o formato "email@email.com"';
const INVALID_PASSWORD_MESSAGE = 'O "password" deve ter pelo menos 6 caracteres';

const validateEmail = (email) => {
  const validEmail = /\S+@\S+\.\S+/;
  const emailTest = validEmail.test(email);
  return emailTest;
};

const authMiddleware = (req, res, next) => {
  const { email, password } = req.body;
  const emailTest = validateEmail(email);

  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (password.length < 6) return res.status(400).json({ message: INVALID_PASSWORD_MESSAGE });
  if (!emailTest) return res.status(400).json({ message: INVALID_EMAIL_MESSAGE });

  const token = generateToken();
  
  req.token = { token };

  next();
};

module.exports = authMiddleware;