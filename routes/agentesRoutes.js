const express = require('express');
const controller = require('../controllers/agentesController.js');

const router = express.Router();

router.get('/', controller.getAllAgents);
router.post('/', controller.createAgent);
router.get('/:id', controller.getAgentById);
router.put('/:id', controller.patchAgent);
router.delete('/:id', controller.deleteAgent);
router.get('/:id/casos',  controller.getCasesByAgent);

module.exports = router;
