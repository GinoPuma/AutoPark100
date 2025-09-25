const express = require('express');
const router = express.Router();
const empresaController = require('../controllers/empresa.controller');
const { validateEmpresa } = require('../validators/empresa.validator');

router.post('/', empresaController.createEmpresa, validateEmpresa);
router.get('/', empresaController.getAllEmpresas);
router.get('/:id', empresaController.getEmpresaById);
router.put('/:id', empresaController.updateEmpresa, validateEmpresa);
router.delete('/:id', empresaController.deleteEmpresa);

module.exports = router;