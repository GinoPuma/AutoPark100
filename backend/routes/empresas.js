const express = require('express');
const router = express.Router();
const empresaController = require('../controllers/empresa.controller');
const authMiddleware = require('../middleware/auth.middleware');
const { admin } = require('../middleware/admin.middleware'); 
const { validateEmpresa } = require('../validators/empresa.validator');

router.post('/', authMiddleware, admin, validateEmpresa, empresaController.createEmpresa); 
router.put('/:id', authMiddleware, admin, validateEmpresa, empresaController.updateEmpresa); 
router.delete('/:id', authMiddleware, admin, empresaController.deleteEmpresa);

router.get('/', authMiddleware, empresaController.getAllEmpresas);
router.get('/:id', authMiddleware, empresaController.getEmpresaById);