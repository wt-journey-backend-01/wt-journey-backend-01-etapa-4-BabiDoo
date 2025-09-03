const express = require('express');
const controller = require('../controllers/agentesController.js');

const router = express.Router();

router.get('/', controller.getAllAgents);
router.post('/', controller.createAgent);
router.get('/:id', /*requireIntId('id'),*/ controller.getAgentById);
router.put('/:id', /*requireIntId('id'),*/ controller.updateAgent);
router.patch('/:id', /*requireIntId('id'),*/ controller.patchAgent);
router.delete('/:id', /*requireIntId('id'),*/ controller.deleteAgent);
router.get('/:id/casos', /*requireIntId('id'),*/ controller.getCasesByAgent);

module.exports = router;
