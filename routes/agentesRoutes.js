const express = require('express');
const controller = require('../controllers/agentesController.js');

const agenteRouter = express.Router();

agenteRouter.get('/', controller.getAllAgents);
agenteRouter.post('/', controller.createAgent);
agenteRouter.get('/:id', controller.getAgentById);
agenteRouter.put('/:id', controller.updateAgent);
agenteRouter.patch('/:id', controller.patchAgent);
agenteRouter.delete('/:id', controller.deleteAgent);

module.exports = agenteRouter;
