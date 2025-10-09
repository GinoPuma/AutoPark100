const express = require('express');
const router = express.Router();
const empresaRoutes = require('./empresas');
const authRoutes = require('./auth'); 

router.use('/empresas', empresaRoutes);
router.use('/auth', authRoutes);

module.exports = router;