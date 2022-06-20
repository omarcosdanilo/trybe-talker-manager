const express = require('express');

const router = express.Router();

const authMiddleware = require('./authMiddleware');

router.post('/', authMiddleware, (req, res) => {
  const { token } = req.token;

  res.status(200).json({ token });
});

module.exports = router;