const express = require('express');
const controller = require('../controllers/agentesController.js');
const authenticateToken = require('../middlewares/authMiddleware');
const agentesRouter = express.Router();


agentesRouter.use(authenticateToken);

agentesRouter.get('/', controller.getAllAgents);
agentesRouter.post('/', controller.createAgent);
agentesRouter.get('/:id', controller.getAgentById);
agentesRouter.put('/:id', controller.updateAgent);
agentesRouter.patch('/:id', controller.patchAgent);
agentesRouter.delete('/:id', controller.deleteAgent);

module.exports = agentesRouter;
