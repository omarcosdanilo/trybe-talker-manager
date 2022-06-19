const express = require('express');

const fs = require('fs/promises');

const router = express.Router();

router.get('/', async (req, res) => {
  const talkers = await fs.readFile('./talker.json', 'utf-8');
  return res.status(200).json(JSON.parse(talkers));
});

module.exports = router;