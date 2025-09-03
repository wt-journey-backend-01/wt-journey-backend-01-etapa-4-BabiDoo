module.exports = function errorHandler(err, req, res, _next) {
  const status = err.statusCode || 500;
  const message = err.message || 'Erro interno do servidor.';
  return res.status(status).json({ error: message });
};
