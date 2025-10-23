const express = require('express');
const router = express.Router();

// Importa las rutas de cada módulo
const empresaRoutes = require('./empresas');
const sedeRoutes = require('./sedes');
const zonaRoutes = require('./zonas');
const espacioRoutes = require('./espacios');
const clienteRoutes = require('./clientes');
const vehiculoTipoRoutes = require('./vehiculosTipos');
const vehiculoRoutes = require('./vehiculos');
const tarifaRoutes = require('./tarifas');
const reservaRoutes = require('./reservas');
const ticketRoutes = require('./tickets');
const metodosPagoRoutes = require('./metodospagos');
const pagoRoutes = require('./pagos');
const rolRoutes = require('./rols');
const usuarioRoutes = require('./usuarios'); 
const sesionCajaRoutes = require('./sesionescaja');
const movimientoCajaRoutes = require('./movimientoscaja');
const authRoutes = require('./auth');

router.use('/empresas', empresaRoutes);
router.use('/sedes', sedeRoutes);
router.use('/zonas', zonaRoutes);
router.use('/espacios', espacioRoutes);
router.use('/clientes', clienteRoutes);
router.use('/vehiculo-tipos', vehiculoTipoRoutes);
router.use('/vehiculos', vehiculoRoutes);
router.use('/tarifas', tarifaRoutes);
router.use('/reservas', reservaRoutes);
router.use('/tickets', ticketRoutes);
router.use('/metodos-pagos', metodosPagoRoutes);
router.use('/pagos', pagoRoutes);
router.use('/roles', rolRoutes);
router.use('/usuarios', usuarioRoutes); 
router.use('/sesiones-caja', sesionCajaRoutes);
router.use('/movimientos-caja', movimientoCajaRoutes);
router.use('/auth', authRoutes);

module.exports = router;