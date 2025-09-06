const repository = require('../repositories/agentesRepository');
const ApiError = require('../utils/ApiError');
const mapError = require('../utils/dbErrorMap');
const { validateCreateOrUpdate, validatePatch } = require('../utils/agentValidator');
const mapPgError = require('../utils/dbErrorMap');

async function getAllAgents(req, res, next) {
  try {
    const rows = await repository.findAll();
    return res.status(200).json(rows);
  } catch {
    return next(mapError(err));
  }
}

async function getAgentById(req, res, next) { 
  try {
    const { id } = req.params;
    const row = await repository.findById(id);
    if(!row) throw new ApiError(404, 'Agente nao encontrado.');
    return res.status(200).json(row);
  } catch (error) {
    return next(mapPgError(error));
  }
}

async function createAgent(req, res, next) {
  try {
    const errors = validateCreateOrUpdate(req.body);
    if(errors.length) throw new ApiError (400, errors.join(''));
    const novo = await repository.create({
      nome: req.body.nome,
      cargo: req.body.cargo,
      dataDeIncorporacao: req.body.dataDeIncorporacao,
    });

    return res.status(201).json(novo);
  } catch (error) {
    return next(mapPgError(error));
  }
}

async function updateAgent(req, res, next) {
  try {
    const { id } = req.params;
    const errors = validateCreateOrUpdate(req.body);
    if(errors.length) throw new ApiError(400, errors.join(''));
    const atualizado = await repository.update(id, {
      nome: req.body.nome,
      cargo: req.body.cargo,
      dataDeIncorporacao: req.body.dataDeIncorporacao
    });

    if(!atualizado) throw new ApiError (404, 'Agente nao encontrado.');
    return res.status(200).json(atualizado);
  } catch (error) {
    return next(mapPgError(error))
  }
}

async function patchAgent(req, res, next) {
  try {
    const { id } = req.params;
    const errors = validatePatch(req.body);
    if(errors.length) throw new ApiError(400, errors.join(''));

    const partial = {};
    if('nome' in req.body) partial.nome = req.body.nome;
    if('cargo' in req.body) partial.cargo = req.body.partial;
    if('dataDeIncorporacao' in req.body) partial.dataDeIncorporacao = req.body.dataDeIncorporacao;

    const atualizado = await repository.patch(id, partial);
    if(!atualizado) throw new ApiError(404, 'Agente nao encontrado.');
    return res.status(200).json(atualizado);
  } catch (error) {
    return next(mapPgError(error));
  }
}

async function deleteAgent(req, res, next) { 
  try {
    const { id } = req.params;
    const ok = await repository.remove(id);
    if(!ok) throw new ApiError(404, 'Agente nao encontrado.');
    return res.status(200).send();
  } catch (error) {
    return next(mapPgError(error));
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