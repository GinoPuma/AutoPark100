/**
 * @swagger
 * tags:
 *   name: MovimientosCaja
 *   description: Endpoints de gestión de movimientos de caja
 */

/**
 * @swagger
 * /movimientos-caja:
 *   post:
 *     summary: Crea un nuevo movimiento de caja
 *     tags: [MovimientosCaja]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sesion_caja_id:
 *                 type: integer
 *                 example: 1
 *               pago_id:
 *                 type: integer
 *                 example: 1
 *               tipo:
 *                 type: string
 *                 enum: [ingreso, egreso]
 *                 example: ingreso
 *               descripcion:
 *                 type: string
 *                 example: "Cobro de servicio"
 *               monto:
 *                 type: number
 *                 example: 150.50
 *     responses:
 *       201:
 *         description: Movimiento de caja creado exitosamente
 *       400:
 *         description: Error de validación
 *
 *   get:
 *     summary: Lista todos los movimientos de caja
 *     tags: [MovimientosCaja]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de movimientos obtenida correctamente
 */

/**
 * @swagger
 * /movimientos-caja/{id}:
 *   get:
 *     summary: Obtiene un movimiento de caja por ID
 *     tags: [MovimientosCaja]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Movimiento de caja encontrado
 *       404:
 *         description: Movimiento de caja no encontrado
 *
 *   put:
 *     summary: Actualiza un movimiento de caja existente
 *     tags: [MovimientosCaja]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sesion_caja_id:
 *                 type: integer
 *                 example: 1
 *               pago_id:
 *                 type: integer
 *                 example: 2
 *               tipo:
 *                 type: string
 *                 enum: [ingreso, egreso]
 *                 example: egreso
 *               descripcion:
 *                 type: string
 *                 example: "Pago de proveedor"
 *               monto:
 *                 type: number
 *                 example: 200
 *     responses:
 *       200:
 *         description: Movimiento de caja actualizado correctamente
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Movimiento de caja no encontrado
 *
 *   delete:
 *     summary: Elimina un movimiento de caja por ID
 *     tags: [MovimientosCaja]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Movimiento de caja eliminado exitosamente
 *       400:
 *         description: No se puede eliminar un movimiento de una sesión cerrada
 *       404:
 *         description: Movimiento de caja no encontrado
 */

const express = require("express");
const router = express.Router();
const movimientosCajaController = require("../controllers/movimientocaja.controller");
const { protect, restrictTo } = require("../middlewares/auth");

router.post(
  "/",
  protect,
  restrictTo("Administrador"),
  movimientosCajaController.createMovimientoCaja
);
router.get("/", protect, movimientosCajaController.getAllMovimientosCaja);
router.get("/:id", protect, movimientosCajaController.getMoviminetoCajaById);
router.put(
  "/:id",
  protect,
  restrictTo("Administrador"),
  movimientosCajaController.updateMovimientoCaja
);
router.delete(
  "/:id",
  protect,
  restrictTo("Administrador"),
  movimientosCajaController.deleteMovimientoCaja
);

module.exports = router;
