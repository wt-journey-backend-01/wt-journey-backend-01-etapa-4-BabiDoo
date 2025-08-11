const repository = require('../repositories/casoRepository.js');
const { caseSchema } = require('../utils/caseValidation.js');
const { casePatchSchema } = require('../utils/partialDataValidation.js');

class ApiError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
  }
}

const getAllCases = async (req, res, next) => {
  try {
    const cases = await repository.findAll();
    res.status(200).json(cases);
  } catch (e) { next(new ApiError('Erro ao listar casos.')); }
};

const getCaseById = async (req, res, next) => {
  try {
    const item = await repository.findById(Number(req.params.id));
    if (!item) return next(new ApiError('Caso não encontrado.', 404));
    res.status(200).json(item);
  } catch (e) { next(new ApiError('Erro ao buscar caso.')); }
};

const createCase = async (req, res, next) => {
  try {
    const { id, ...payload } = req.body;
    const data = caseSchema.parse(payload);

    const created = await repository.create({
      titulo: data.titulo,
      descricao: data.descricao,
      status: data.status ?? 'aberto',
      agente_id: data.agenteId ?? null,
    });

    res.status(201).json(created);
  } catch (e) {
    if (e.statusCode) return next(e);
    next(new ApiError(e?.message || 'Erro ao criar caso.', 400));
  }
};
 const updateCase = async (req, res, next) => {
  try {
    const data = caseSchema.parse(req.body);
    const updated = await repository.update(Number(req.params.id), {
      titulo: data.titulo,
      descricao: data.descricao,
      status: data.status,
      agente_id: data.agenteId ?? null,
    });
    if (!updated) return next(new ApiError('Caso não encontrado.', 404));
    res.status(200).json(updated);
  } catch (e) { next(new ApiError(e?.message || 'Erro ao atualizar caso.', 400)); }
};
const patchCase = async (req, res, next) => {
  try {
    const data = casePatchSchema.parse(req.body);
    const updated = await repository.patch(Number(req.params.id), {
      ...(data.titulo !== undefined && { titulo: data.titulo }),
      ...(data.descricao !== undefined && { descricao: data.descricao }),
      ...(data.status !== undefined && { status: data.status }),
      ...(data.agenteId !== undefined && { agente_id: data.agenteId }),
    });
    if (!updated) return next(new ApiError('Caso não encontrado.', 404));
    res.status(200).json(updated);
  } catch (e) { next(new ApiError(e?.message || 'Erro ao atualizar caso.', 400)); }
};

const deleteCase = async (req, res, next) => {
  try {
    const ok = await repository.remove(Number(req.params.id));
    if (!ok) return next(new ApiError('Caso não encontrado.', 404));
    res.sendStatus(204);
  } catch (e) { next(new ApiError('Erro ao deletar o caso.')); }
};

module.exports = { getAllCases, createCase, updateCase, patchCase, deleteCase, getCaseById }