const INVALID_NAME_MESSAGE = 'O "name" deve ter pelo menos 3 caracteres';
const INVALID_AGE_MESSAGE = 'A pessoa palestrante deve ser maior de idade';
const NO_WATCHED_AT_MESSAGE = 'O campo "watchedAt" é obrigatório';
const INVALID_DATE_MESSAGE = 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"';
const INVALID_RATE_MESSAGE = 'O campo "rate" deve ser um inteiro de 1 à 5';

const err = (message) => { throw new Error(message); };

const validateName = (name) => {
  if (!name) err('O campo "name" é obrigatório');
  if (name.length < 3) err(INVALID_NAME_MESSAGE);
};

const validateAge = (age) => {
  if (!age) err('O campo "age" é obrigatório');
  if (age < 18) err(INVALID_AGE_MESSAGE);
};

const validateWatchedAt = (watchedAt) => {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const validateFormatDate = match.test(watchedAt);
  if (!watchedAt) err(NO_WATCHED_AT_MESSAGE);
  if (!validateFormatDate) err(INVALID_DATE_MESSAGE);
};

const validateRate = (rate) => {
  const rateRange = rate >= 1 && rate <= 5;
  if (rate === 0) err(INVALID_RATE_MESSAGE);
  if (!rate) err('O campo "rate" é obrigatório');
  if (!rateRange) err(INVALID_RATE_MESSAGE);
};

const validateTalk = (talk) => {
  if (!talk) err('O campo "talk" é obrigatório');
  validateWatchedAt(talk.watchedAt);
  validateRate(talk.rate);
};

const authNewTalkerPost = (req, res, next) => {
  try {
    const { name, age, talk } = req.body;
    validateName(name);
    validateAge(age);
    validateTalk(talk);
  
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = authNewTalkerPost;