const repository = require('../repositories/agenteRepository.js');
const { agentSchema } = require('../utils/agentValidation.js');
const { agentPatchSchema } = require('../utils/partialDataValidation.js');

class ApiError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
  }
}

const getAllAgents = async (req, res, next) => {
  try {
    const agents = await repository.findAll();
    res.status(200).json(agents);
  } catch (e) { console.error('getAllAgents error:', e); next(new ApiError('Erro ao listar agentes.')); }
};

const getAgentById = async (req, res, next) => {
  try {
    const agent = await repository.findById(Number(req.params.id));
    if (!agent) return next(new ApiError('Agente não encontrado.', 404));
    res.status(200).json(agent);
  } catch (e) { next(new ApiError('Erro ao buscar agente.')); }
};
const createAgent = async (req, res, next) => {
  try {
    const { id, ...payload } = req.body;
    const data = agentSchema.parse(payload);
    const created = await repository.create(data);
    res.status(201).json(created);
  } catch (e) {
    if (e.statusCode) return next(e);
    next(new ApiError(e?.message || 'Erro ao criar agente.', 400));
  }
};

const updateAgent = async (req, res, next) => {
  try {
    const data = agentSchema.parse(req.body);
    const updated = await repository.update(Number(req.params.id), data);
    if (!updated) return next(new ApiError('Agente não encontrado.', 404));
    res.status(200).json(updated);
  } catch (e) { next(new ApiError(e?.message || 'Erro ao atualizar agente.', 400)); }
};

const patchAgent = async (req, res, next) => {
  try {
    const data = agentPatchSchema.parse(req.body);
    const updated = await repository.patch(Number(req.params.id), data);
    if (!updated) return next(new ApiError('Agente não encontrado.', 404));
    res.status(200).json(updated);
  } catch (e) { next(new ApiError(e?.message || 'Erro ao atualizar agente.', 400)); }
};

const deleteAgent = async (req, res, next) => {
  try {
    const ok = await repository.remove(Number(req.params.id));
    if (!ok) return next(new ApiError('Agente não encontrado.', 404));
    res.sendStatus(204);
  } catch (e) { next(new ApiError('Erro ao deletar agente.')); }
};

module.exports = {
  getAllAgents,
  getAgentById,
  createAgent,
  updateAgent,
  patchAgent,
  deleteAgent
};