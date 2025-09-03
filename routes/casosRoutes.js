const express = require('express');
const controller = require('../controllers/casosController.js');
const { requireUuidParam } = require('../utils/requireUuidParam.js');

const caseRouter = express.Router();

caseRouter.get('/', controller.getAllCases);
caseRouter.post('/', controller.createCase);
caseRouter.get('/:id', requireUuidParam('id'), controller.getCaseById);
caseRouter.put('/:id', requireUuidParam('id'), controller.updateCase);
caseRouter.patch('/:id', requireUuidParam('id'), controller.patchCase);
caseRouter.delete('/:id', requireUuidParam('id'), controller.deleteCase);

module.exports = caseRouter;