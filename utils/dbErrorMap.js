const ApiError = require('../utils/ApiError');

function mapPgError(err) {
  if (!err || !err.code) return err;

  switch (err.code) {
    case '23503': // FK violation
      return new ApiError(404, 'Registro relacionado não encontrado.');
    case '23502': // NOT NULL
      return new ApiError(400, 'Campo obrigatório ausente.');
    case '23505': // UNIQUE
      return new ApiError(409, 'Registro duplicado.');
    case '22P02': // invalid conversion
      return new ApiError(400, 'Parâmetro inválido.');
    default:
      return err; // erroHandler(500)
  }
}
module.exports = mapPgError;
