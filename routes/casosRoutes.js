const express = require('express');
const controller = require('../controllers/casosController.js');
const authenticateToken = require('../middlewares/authMiddleware');
const casosRouter = express.Router();

casosRouter.use(authenticateToken);

casosRouter.get('/', controller.getAllCases);
casosRouter.post('/', controller.createCase);
casosRouter.get('/:id', controller.getCaseById);
casosRouter.put('/:id', controller.updateCase);
casosRouter.patch('/:id', controller.patchCase);
casosRouter.delete('/:id', controller.deleteCase);

module.exports = casosRouter;
