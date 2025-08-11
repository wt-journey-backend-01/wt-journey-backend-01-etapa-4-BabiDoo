const express = require('express');
const controller = require('../controllers/agenteController.js');
const repository = require('../repositories/agenteRepository.js');

const agentRouter = express.Router();

agentRouter.get('/', controller.getAllAgents);
agentRouter.get('/:id', controller.getAgentById);
agentRouter.post('/', controller.createAgent);
agentRouter.put('/:id', controller.updateAgent);
agentRouter.patch('/:id', controller.patchAgent);
agentRouter.delete('/:id', controller.deleteAgent);

agentRouter.get('/:id/casos', async (req, res, next) => {
  try {
    const casos = await repository.findCasosByAgenteId(Number(req.params.id));
    res.status(200).json(casos);
  } catch (e) { next(e); }
});

module.exports = agentRouter;
