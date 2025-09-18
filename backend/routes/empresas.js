const express = require('express');
const router = express.Router();
const empresaController = require('../controllers/empresa.controller');

router.post('/', empresaController.createEmpresa);
router.get('/', empresaController.getAllEmpresas);
router.get('/:id', empresaController.getEmpresaById);
router.put('/:id', empresaController.updateEmpresa);
router.delete('/:id', empresaController.deleteEmpresa);

module.exports = router;