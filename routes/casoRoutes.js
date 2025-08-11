const express = require('express');
const controller = require('../controllers/casoController.js');

const caseRouter = express.Router();

caseRouter.get('/', controller.getAllCases);
caseRouter.get('/:id', controller.getCaseById);
caseRouter.post('/', controller.createCase);
caseRouter.put('/:id', controller.updateCase);
caseRouter.patch('/:id', controller.patchCase);
caseRouter.delete('/:id', controller.deleteCase);

module.exports = caseRouter;
