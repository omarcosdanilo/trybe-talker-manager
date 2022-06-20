const express = require('express');

const fs = require('fs/promises');

const router = express.Router();

const authNewTalkerPost = require('./authNewTalkerPost');

const getTalkers = async () => {
  const talkers = await fs.readFile('./talker.json', 'utf-8');
  const talkersParsed = JSON.parse(talkers);
  return talkersParsed;
};

const writeTalker = async (newTalker) => {
  const talkers = await getTalkers();
  talkers.push(newTalker);
  await fs.writeFile('./talker.json', JSON.stringify(talkers));
};

router.get('/', async (req, res) => {
  const talkers = await getTalkers();
  return res.status(200).json(talkers);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await getTalkers();
  const talkerIndex = talkers.findIndex((talker) => talker.id === Number(id));

  if (talkerIndex !== -1) return res.status(200).json(talkers[talkerIndex]);

  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

router.post('/', authNewTalkerPost, async (req, res) => {
  await writeTalker(req.body);
  res.status(201).json(req.body);
});

module.exports = router;