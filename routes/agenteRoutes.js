import express from 'express';
import * as controller from '../controllers/agenteController.js';
import * as repository from '../repositories/agenteRepository.js';

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

export default agentRouter;