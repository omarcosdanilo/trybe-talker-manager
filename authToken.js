const err = (message) => { throw new Error(message); };

const validateToken = (req) => {
  const { authorization } = req.headers;
  if (!authorization) err('Token não encontrado');
  if (authorization.length < 16) err('Token inválido');
};

const authtoken = (req, res, next) => {
  try {
    validateToken(req);
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = authtoken;
