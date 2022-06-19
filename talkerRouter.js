const express = require('express');

const fs = require('fs/promises');

const router = express.Router();

const getTalkers = async () => {
  const talkers = await fs.readFile('./talker.json', 'utf-8');
  const talkersParsed = JSON.parse(talkers);
  return talkersParsed;
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

module.exports = router;