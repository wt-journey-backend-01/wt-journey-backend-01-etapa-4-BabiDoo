const express = require('express');
const controller = require('../controllers/casosController.js');

const router = express.Router();

router.get('/', controller.getAllCases);
router.post('/', controller.createCase);
router.get('/:id', controller.getCaseById);
router.put('/:id', controller.updateCase);
router.patch('/:id', controller.patchCase);
router.delete('/:id', controller.deleteCase);

module.exports = router;
