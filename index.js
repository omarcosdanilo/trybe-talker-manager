const express = require('express');
const bodyParser = require('body-parser');

// const authMiddleware = require('./authMiddleware');
// const authNewTalkerPost = require('./authNewTalkerPost');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

const talkerRouter = require('./talkerRouter');
const loginRouter = require('./loginRouter');

app.use('/login', loginRouter);
app.use('/talker', talkerRouter);
// app.use(authMiddleware);
// app.use(authNewTalkerPost);

// app.use(authNewTalkerPost);
// app.use('/talker', talkerRouter);
// app.use(authMiddleware);
// app.use('/login', loginRouter);

app.listen(PORT, () => {
  console.log('Online');
});
