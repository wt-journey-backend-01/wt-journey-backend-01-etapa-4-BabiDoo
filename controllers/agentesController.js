const repository = require("../repositories/agentesRepository");
const ApiError = require("../utils/ApiError");
const {
  validateCreateOrUpdate,
  validatePatch,
} = require("../utils/agentValidator");

const toYMD = (d) => {
  if (!d) return d;
  const date = typeof d === "string" ? new Date(d) : d;
  if (Number.isNaN(date.getTime())) return d;
  return date.toISOString().slice(0, 10);
};

async function getAllAgents(req, res, next) {
  try {
    const rows = await repository.findAll();
    const payload = rows.map((r) => ({
      ...r,
      dataDeIncorporacao: toYMD(r.dataDeIncorporacao),
    }));
    return res.status(200).json(payload);
  } catch (error) {
    const code = error.statusCode || 500;
    return res.status(code).json({ error: error.message || "Erro interno." });
  }
}

async function getAgentById(req, res, next) {
  try {
    const { id } = req.params;
    const row = await repository.findById(id);
    if (!row) throw new ApiError(404, "Agente nao encontrado.");
    const payload = {
      ...row,
      dataDeIncorporacao: toYMD(row.dataDeIncorporacao),
    };
    return res.status(200).json(payload);
  } catch (error) {
    const code = error.statusCode || 500;
    return res.status(code).json({ error: error.message || "Erro interno." });
  }
}

async function createAgent(req, res, next) {
  console.log("[CREATE_AGENT][REQ BODY]", req.body);
  try {
    const errors = validateCreateOrUpdate(req.body);
    console.log("[CREATE_AGENT][VALIDATION ERRORS]", errors);
    if (errors.length) throw new ApiError(400, errors.join(""));
    const novo = await repository.create({
      nome: req.body.nome,
      cargo: req.body.cargo,
      dataDeIncorporacao: req.body.dataDeIncorporacao,
    });
    const payload = {
      ...novo,
      dataDeIncorporacao: toYMD(novo.dataDeIncorporacao),
    };
    console.log("[CREATE_AGENT][DB RESULT]", novo);

    return res.status(201).json(payload);
  } catch (error) {
    const code = error.statusCode || 500;
    return res.status(code).json({ error: error.message || "Erro interno." });
  }
}

async function updateAgent(req, res, next) {
  try {
    const { id } = req.params;
    if ("id" in req.body && req.body.id !== id) {
      throw new ApiError(400, "Não é permitido alterar o ID.");
    }
    const errors = validateCreateOrUpdate(req.body);
    if (errors.length) throw new ApiError(400, errors.join(""));
    const atualizado = await repository.update(id, {
      nome: req.body.nome,
      cargo: req.body.cargo,
      dataDeIncorporacao: req.body.dataDeIncorporacao,
    });

    if (!atualizado) throw new ApiError(404, "Agente nao encontrado.");
    const payload = {
      ...atualizado,
      dataDeIncorporacao: toYMD(atualizado.dataDeIncorporacao),
    };
    return res.status(200).json(payload);
  } catch (error) {
    const code = error.statusCode || 500;
    return res.status(code).json({ error: error.message || "Erro interno." });
  }
}

async function patchAgent(req, res, next) {
  try {
    const { id } = req.params;
    if ("id" in req.body && req.body.id !== req.params.id) {
      throw new ApiError(400, "Não é permitido alterar o ID.");
    }
    if (Object.keys(req.body).length === 0) {
      throw new ApiError(400, "Payload vazio.");
    }
    const errors = validatePatch(req.body);
    if (errors.length) throw new ApiError(400, errors.join(""));

    const partial = {};
    if ("nome" in req.body) partial.nome = req.body.nome;
    if ("cargo" in req.body) partial.cargo = req.body.cargo;
    if ("dataDeIncorporacao" in req.body)
      partial.dataDeIncorporacao = req.body.dataDeIncorporacao;

    const atualizado = await repository.patch(id, partial);
    if (!atualizado) throw new ApiError(404, "Agente nao encontrado.");
    const payload = {
      ...atualizado,
      dataDeIncorporacao: toYMD(atualizado.dataDeIncorporacao),
    };
    return res.status(200).json(payload);
  } catch (error) {
    const code = error.statusCode || 500;
    return res.status(code).json({ error: error.message || "Erro interno." });
  }
}

async function deleteAgent(req, res, next) {
  console.log("Tento Deletar: ", req.body);
  try {
    const { id } = req.params;
    const ok = await repository.remove(id);
    if (!ok) throw new ApiError(404, "Agente nao encontrado.");
    return res.status(204).send();
  } catch (error) {
    const code = error.statusCode || 500;
    return res.status(code).json({ error: error.message || "Erro interno." });
  }
}

module.exports = {
  getAllAgents,
  createAgent,
  getAgentById,
  updateAgent,
  patchAgent,
  deleteAgent,
};
