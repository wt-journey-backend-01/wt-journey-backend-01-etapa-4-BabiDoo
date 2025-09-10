const db = require("../db/db");
const repository = require("../repositories/casosRepository");
const ApiError = require("../utils/ApiError");
const {
  validateCreateOrUpdateCase,
  validatePatchCase,
} = require("../utils/caseValidator");

const isUUID = (v) =>
  typeof v === "string" &&
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(v);

const ensureId404 = (id) => {
  if (!isUUID(id)) throw new ApiError(404, "Caso nao encontrado.");
};

const ensureAgent404 = async (agente_id) => {
  if (!isUUID(agente_id)) throw new ApiError(404, "Agente não encontrado.");
  const agent = await db("agentes").where({ id: agente_id }).first();
  if (!agent) throw new ApiError(404, "Agente não encontrado.");
};

const ensureNoExtra = (body, allowed) => {
  const hasExtra = Object.keys(body).some((k) => !allowed.includes(k));
  if (hasExtra) throw new ApiError(400, "Payload contém campos não permitidos.");
};

async function getAllCases(req, res) {
  try {
    const rows = await repository.findAll();
    return res.status(200).json(rows);
  } catch (error) {
    const code = error.statusCode || 500;
    return res.status(code).json({ error: error.message || "Erro interno." });
  }
}

async function getCaseById(req, res) {
  try {
    const { id } = req.params;
    ensureId404(id);
    const row = await repository.findById(id);
    if (!row) throw new ApiError(404, "Caso nao encontrado.");
    return res.status(200).json(row);
  } catch (error) {
    const code = error.statusCode || 500;
    return res.status(code).json({ error: error.message || "Erro interno." });
  }
}

async function createCase(req, res) {
  try {
    ensureNoExtra(req.body, ["titulo", "descricao", "status", "agente_id"]);

    const errors = await validateCreateOrUpdateCase(req.body);
    if (errors.length) throw new ApiError(400, errors.join(""));

    await ensureAgent404(req.body.agente_id);

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

async function updateCase(req, res) {
  try {
    const { id } = req.params;
    ensureId404(id);
    if ("id" in req.body && req.body.id !== id) {
      throw new ApiError(400, "Não é permitido alterar o ID.");
    }

    ensureNoExtra(req.body, ["titulo", "descricao", "status", "agente_id", "id"]);

    const errors = await validateCreateOrUpdateCase(req.body);
    if (errors.length) throw new ApiError(400, errors.join(""));

    await ensureAgent404(req.body.agente_id);

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

async function patchCase(req, res) {
  try {
    const { id } = req.params;
    ensureId404(id);
    if ("id" in req.body && req.body.id !== id) {
      throw new ApiError(400, "Não é permitido alterar o ID.");
    }
    if (Object.keys(req.body).length === 0) {
      throw new ApiError(400, "Payload vazio.");
    }

    ensureNoExtra(req.body, ["titulo", "descricao", "status", "agente_id", "id"]);

    const errors = await validatePatchCase(req.body);
    if (errors.length) throw new ApiError(400, errors.join(""));

    if ("agente_id" in req.body) {
      await ensureAgent404(req.body.agente_id);
    }

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

async function deleteCase(req, res) {
  try {
    const { id } = req.params;
    ensureId404(id);
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
