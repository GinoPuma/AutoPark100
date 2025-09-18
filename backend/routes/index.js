const express = require('express');
const router = express.Router();
const empresaRoutes = require('./empresas');
const sedeRoutes = require('./sedes');

router.use('/empresas', empresaRoutes);
router.use('/sedes', sedeRoutes);

module.exports = router;