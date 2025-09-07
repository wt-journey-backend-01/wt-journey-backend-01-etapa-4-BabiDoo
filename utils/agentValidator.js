const validEntry = (valid) => typeof valid === 'string' && valid.trim().length > 0;

const rxDate = /^\d{4}-\d{2}-\d{2}$/;
const validateDate = (entry) => {
  if (!rxDate.test(entry)) return false;
  const newDate = new Date(`${entry}T00:00:00Z`);
  const today = new Date();
  return !Number.isNaN(newDate.getTime()) && newDate <= today;
};

function validateCreateOrUpdate(body) {
  const errors = [];
  if ((!body.nome) || !validEntry(body.nome)) errors.push('nome obrigatório.');
  if (!body.cargo) errors.push('Cargo é obrigatório.'); 
  if ((!body.dataDeIncorporacao) || !validEntry(body.dataDeIncorporacao) || !validateDate(body.dataDeIncorporacao))
    errors.push('dataDeIncorporacao precisa existir no formato (YYYY-MM-DD) e não pode ser no futuro.');
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
