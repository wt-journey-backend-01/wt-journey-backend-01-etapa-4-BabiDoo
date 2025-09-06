const validEntry = (valid) => typeof valid === 'string' && valid.trim().length > 0;

const date = /^\d{4}-\d{2}-\d{2}$/;
const validateDate = (entry) => {
  if (!date.test(entry)) return false;
  const newDate = new Date(`${entry}T00:00:00Z`);
  const today = new date();
  return !Number.isNaN(newDate.getTime()) && newDate <= today;
};

function validateCreateOrUpdate(body) {
  const errors = [];
  if (!validEntry(body.nome)) errors.push('nome é obrigatório.');
  if (!validEntry(body.cargo) || !CARGOS.includes(body.cargo))
    errors.push(`cargo inválido. Use: ${CARGOS.join(', ')}.`);
  if (!validEntry(body.dataDeIncorporacao) || !validateDate(body.dataDeIncorporacao))
    errors.push('dataDeIncorporacao inválida (YYYY-MM-DD) e não pode ser no futuro.');
  return errors;
}

function validatePatch(body) {
  const errors = [];
  if ('nome' in body && !validEntry(body.nome)) errors.push('nome inválido.');
  if ('cargo' in body && (!validEntry(body.cargo))) errors.push(`cargo inválido.`);
  if ('dataDeIncorporacao' in body && (!validEntry(body.dataDeIncorporacao) || !validateDate(body.dataDeIncorporacao)))
    errors.push('dataDeIncorporacao inválida.');
  return errors;
}

module.exports = { validateCreateOrUpdate, validatePatch };
