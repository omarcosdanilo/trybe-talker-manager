const express = require('express');

const fs = require('fs/promises');

const router = express.Router();

const authNewTalkerPost = require('./authNewTalkerPost');
const authtoken = require('./authToken');

const getTalkers = async () => {
  const talkers = await fs.readFile('./talker.json', 'utf-8');
  const talkersParsed = JSON.parse(talkers);
  return talkersParsed;
};

const writeTalker = async (newTalkerData) => {
  const { age, name, talk } = newTalkerData;
  const talkers = await getTalkers();
  const newTalker = { name, age, id: talkers.length + 1, talk };
  talkers.push(newTalker);
  await fs.writeFile('./talker.json', JSON.stringify(talkers));
  return newTalker;
};

const updateTalker = async (id, newTalkerData) => {
  const talkers = await getTalkers();
  const talkerIndex = talkers.findIndex((talker) => talker.id === Number(id));
  if (talkerIndex !== -1) talkers[talkerIndex] = { ...talkers[talkerIndex], ...newTalkerData };

  await fs.writeFile('./talker.json', JSON.stringify(talkers));
  return { id: Number(id), ...newTalkerData };
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

router.post('/', authtoken, authNewTalkerPost, async (req, res) => {
  const newTalker = await writeTalker(req.body);
  res.status(201).json(newTalker);
});

router.put('/:id', authtoken, authNewTalkerPost, async (req, res) => {
  const { id } = req.params;
  const talkerData = await updateTalker(id, req.body);
  res.status(200).json(talkerData);
});

router.delete('/:id', authtoken, async (req, res) => {
  const { id } = req.params;
  const talkers = await getTalkers();
  const talkerIndex = talkers.findIndex((item) => item.id === Number(id));
  talkers.splice(talkerIndex, 1);
  await fs.writeFile('./talker.json', JSON.stringify(talkers));
  res.send(204).end();
});

module.exports = router;