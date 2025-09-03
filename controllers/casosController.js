const repo = require('../repositories/casosRepository.js');
const agentesRepo = require('../repositories/agentesRepository.js');
const { caseSchema } = require('../utils/caseValidation.js');
const { casePatchSchema } = require('../utils/partialDataValidation.js');
const { ZodError } = require('zod');

class ApiError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
  }
}

module.exports.getAllCases = async (req, res, next) => {
  try {
    const { status, agente_id } = req.query;
    const parsed = {};
    if (status) parsed.status = status;
    if (agente_id !== undefined) {
      const n = Number(agente_id);
      if (Number.isInteger(n) && n > 0) parsed.agente_id = n;
    }
    const casos = await repo.findAll(parsed);
    return res.json(casos);
  } catch {
    return next(new ApiError('Erro ao listar casos.'));
  }
};

module.exports.getCaseById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) return next(new ApiError('ID inválido.', 400));
    const caso = await repo.findById(id);
    if (!caso) return next(new ApiError('Caso não encontrado.', 404));
    return res.json(caso);
  } catch {
    return next(new ApiError('Erro ao buscar caso.'));
  }
};

module.exports.createCase = async (req, res, next) => {
  try {
    const data = caseSchema.parse(req.body); // titulo, descricao, status?, agente_id?
    if (data.agente_id !== null && data.agente_id !== undefined) {
      const agent = await agentesRepo.findById(Number(data.agente_id));
      if (!agent) return next(new ApiError('Agente não encontrado.', 404));
    }
    const created = await repo.create(data);
    return res.status(201).json(created);
  } catch (err) {
    if (err instanceof ZodError) return next(new ApiError('Parâmetros inválidos.', 400));
    return next(new ApiError('Erro ao criar caso.'));
  }
};

module.exports.updateCase = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) return next(new ApiError('ID inválido.', 400));
    const data = caseSchema.parse(req.body);
    if (data.agente_id !== null && data.agente_id !== undefined) {
      const agent = await agentesRepo.findById(Number(data.agente_id));
      if (!agent) return next(new ApiError('Agente não encontrado.', 404));
    }
    const updated = await repo.update(id, data);
    if (!updated) return next(new ApiError('Caso não encontrado.', 404));
    return res.json(updated);
  } catch (err) {
    if (err instanceof ZodError) return next(new ApiError('Parâmetros inválidos.', 400));
    return next(new ApiError('Erro ao atualizar o caso.'));
  }
};

module.exports.patchCase = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) return next(new ApiError('ID inválido.', 400));
    const partial = casePatchSchema.parse(req.body);
    if (partial.agente_id !== undefined && partial.agente_id !== null) {
      const agent = await agentesRepo.findById(Number(partial.agente_id));
      if (!agent) return next(new ApiError('Agente não encontrado.', 404));
    }
    const updated = await repo.patch(id, partial);
    if (!updated) return next(new ApiError('Caso não encontrado.', 404));
    return res.json(updated);
  } catch (err) {
    if (err instanceof ZodError) return next(new ApiError('Parâmetros inválidos.', 400));
    return next(new ApiError('Erro ao atualizar o caso.'));
  }
};

module.exports.deleteCase = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) return next(new ApiError('ID inválido.', 400));
    const deleted = await repo.remove(id);
    if (!deleted) return next(new ApiError('Caso não encontrado.', 404));
    return res.sendStatus(204);
  } catch {
    return next(new ApiError('Erro ao deletar o caso.'));
  }
};
