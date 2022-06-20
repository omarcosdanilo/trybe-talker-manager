// const generateToken = require('./generateToken');

const INVALID_NAME_MESSAGE = 'O "name" deve ter pelo menos 3 caracteres';
const INVALID_AGE_MESSAGE = 'A pessoa palestrante deve ser maior de idade';
const NO_WATCHED_AT_MESSAGE = 'O campo "watchedAt" é obrigatório';
const INVALID_DATE_MESSAGE = 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"';
const INVALID_RATE_MESSAGE = 'O campo "rate" deve ser um inteiro de 1 à 5';

const validateToken = (req, res) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
  if (authorization.length < 16) return res.status(401).json({ message: 'Token inválido' });
};

const validateName = (name, res) => {
  if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3) return res.status(400).json({ message: INVALID_NAME_MESSAGE });
};

const validateAge = (age, res) => {
  if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (age < 18) return res.status(400).json({ message: INVALID_AGE_MESSAGE });
};

const validateWatchedAt = (watchedAt, res) => {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const validateFormatDate = match.test(watchedAt);
  if (!watchedAt) return res.status(400).json({ message: NO_WATCHED_AT_MESSAGE });
  if (!validateFormatDate) return res.status(400).json({ message: INVALID_DATE_MESSAGE });
};

const validateRate = (rate, res) => {
  const rateRange = rate >= 1 && rate <= 5;
  if (!rate) return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  if (!rateRange) return res.status(400).json({ message: INVALID_RATE_MESSAGE });
};

const validateTalk = (talk, res) => {
  if (!talk) return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  validateWatchedAt(talk.watchedAt, res);
  validateRate(talk.rate, res);
};

const authNewTalkerPost = (req, res, next) => {
  const { name, age, talk } = req.body;
  validateToken(req, res);
  validateName(name, res);
  validateAge(age, res);
  validateTalk(talk, res);

  next();
};

module.exports = authNewTalkerPost;