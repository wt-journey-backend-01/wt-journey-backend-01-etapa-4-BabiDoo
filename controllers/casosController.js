const db = require("../db/db");
const repository = require("../repositories/casosRepository");
const ApiError = require("../utils/ApiError");
const {
  validateCreateOrUpdateCase,
  validatePatchCase,
} = require("../utils/caseValidator");
async function getAllCases(req, res, next) {
  try {
    const rows = await repository.findAll();
    return res.status(200).json(rows);
  } catch (error) {
    const code = error.statusCode || 500;
    return res.status(code).json({ error: error.message || "Erro interno." });
  }
}

async function getCaseById(req, res, next) {
  try {
    const { id } = req.params;
    const row = await repository.findById(id);
    if (!row) throw new ApiError(404, "Caso nao encontrado.");
    return res.status(200).json(row);
  } catch (error) {
    const code = error.statusCode || 500;
    return res.status(code).json({ error: error.message || "Erro interno." });
  }
}

async function createCase(req, res, next) {
  try {
    const errors = await validateCreateOrUpdateCase(req.body);
    if (errors.length) throw new ApiError(400, errors.join(""));
    const novo = await repository.create({
      titulo: req.body.titulo,
      descricao: req.body.descricao,
      status: req.body.status,
      agente_id: req.body.agente_id,
    });

    return res.status(201).json(novo);
  } catch (error) {
    const code = error.statusCode || 500;
    return res.status(code).json({ error: error.message || "Erro interno." });
  }
}

async function updateCase(req, res, next) {
  try {
    const { id } = req.params;
    if ("id" in req.body && req.body.id !== id) {
      throw new ApiError(400, "Não é permitido alterar o ID.");
    }

    const errors = await validateCreateOrUpdateCase(req.body);
    if (errors.length) throw new ApiError(400, errors.join(""));
    const atualizado = await repository.update(id, {
      titulo: req.body.titulo,
      descricao: req.body.descricao,
      status: req.body.status,
      agente_id: req.body.agente_id,
    });

    if (!atualizado) throw new ApiError(404, "Caso nao encontrado.");
    return res.status(200).json(atualizado);
  } catch (error) {
    const code = error.statusCode || 500;
    return res.status(code).json({ error: error.message || "Erro interno." });
  }
}

async function patchCase(req, res, next) {
  try {
    const { id } = req.params;
    if ("id" in req.body && req.body.id !== id) {
      throw new ApiError(400, "Não é permitido alterar o ID.");
    }
    if (Object.keys(req.body).length === 0) {
      throw new ApiError(400, "Payload vazio.");
    }

    const errors = await validatePatchCase(req.body);
    if (errors.length) throw new ApiError(400, errors.join(""));

    const partial = {};
    if ("titulo" in req.body) partial.titulo = req.body.titulo;
    if ("descricao" in req.body) partial.descricao = req.body.descricao;
    if ("status" in req.body) partial.status = req.body.status;
    if ("agente_id" in req.body) partial.agente_id = req.body.agente_id;

    const atualizado = await repository.patch(id, partial);
    if (!atualizado) throw new ApiError(404, "Caso nao encontrado.");
    return res.status(200).json(atualizado);
  } catch (error) {
    const code = error.statusCode || 500;
    return res.status(code).json({ error: error.message || "Erro interno." });
  }
}

async function deleteCase(req, res, next) {
  try {
    const { id } = req.params;
    const ok = await repository.remove(id);
    if (!ok) throw new ApiError(404, "Caso nao encontrado.");
    return res.status(204).end();
  } catch (error) {
    const code = error.statusCode || 500;
    return res.status(code).json({ error: error.message || "Erro interno." });
  }
}

module.exports = {
  getAllCases,
  getCaseById,
  createCase,
  updateCase,
  patchCase,
  deleteCase,
};
