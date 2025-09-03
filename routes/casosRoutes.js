const express = require('express');
const controller = require('../controllers/casosController.js');

const router = express.Router();

router.get('/', controller.getAllCases);
router.post('/', controller.createCase);
router.get('/:id', /*requireIntId('id'),*/ controller.getCaseById);
router.put('/:id', /*requireIntId('id'),*/ controller.updateCase);
router.patch('/:id', /*requireIntId('id'),*/ controller.patchCase);
router.delete('/:id', /*requireIntId('id'),*/ controller.deleteCase);

module.exports = router;
