const STATUS = ["aberto", "solucionado"];
const db = require('../db/db');

const isNonEmptyStr = (v) => typeof v === "string" && v.trim().length > 0;
const hasMinLen = (v, n) => isNonEmptyStr(v) && v.trim().length >= n;
const isPositiveInt = (v) => Number.isInteger(v) && v > 0;

async function agentExists(agenteId) {
  const found = await db("agentes").where({ id: agenteId }).first();
  return !!found;

}

async function validateCreateOrUpdateCase(body) {
  const errors = [];

  if ((!body.titulo) || (!hasMinLen(body.titulo, 10))) {
    errors.push("O título do caso deve existir e ter pelo menos 10 caracteres.");
  }

  if ((!body.descricao) || (!hasMinLen(body.descricao, 10))) {
    errors.push("A descrição do caso deve existir e ter pelo menos 10 caracteres.");
  }

  if ((!body.status) || (!STATUS.includes(body.status))) {
    errors.push(`Status inválido. Use: ${STATUS.join(" | ")}.`);
  }

  if ((!body.agente_id) || (typeof body.agente_id !== "number" || !isPositiveInt(body.agente_id))) {
    errors.push("agente_id é obrigatório.");
  }

  if (errors.length === 0) {
    const exists = await agentExists(body.agente_id);
    if (!exists) errors.push("agente_id inexistente no banco.");
  }

  return errors;
}

async function validatePatchCase(body) {
  const errors = [];

  if ("titulo" in body && !hasMinLen(body.titulo, 10)) {
    errors.push("O título do caso deve ter pelo menos 10 caracteres.");
  }

  if ("descricao" in body && !hasMinLen(body.descricao, 10)) {
    errors.push("A descrição do caso deve ter pelo menos 10 caracteres.");
  }

  if ("status" in body && !STATUS.includes(body.status)) {
    errors.push(`Status inválido. Use: ${STATUS.join(" | ")}.`);
  }

  if ("agente_id" in body) {
    if (typeof body.agente_id !== "number" || !isPositiveInt(body.agente_id)) {
      errors.push("agente_id inválido.");
    } else if (errors.length === 0) {
      const exists = await agentExists(body.agente_id);
      if (!exists) errors.push("agente_id inexistente no banco.");
    }
  }
  return errors
}

module.exports = { 
  validateCreateOrUpdateCase, 
  validatePatchCase
};
