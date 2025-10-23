/**
 * @swagger
 * tags:
 *   name: SesionCaja
 *   description: Endpoints para gestión de sesiones de caja
 */

/**
 * @swagger
 * /sesiones-caja:
 *   post:
 *     summary: Crea una nueva sesión de caja
 *     tags: [SesionCaja]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario_id:
 *                 type: integer
 *                 example: 1
 *               saldo_inicial:
 *                 type: number
 *                 example: 1000
 *               fecha_abierto:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-10-23T08:00:00Z"
 *               fecha_cierre:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-10-23T16:00:00Z"
 *               saldo_cierre:
 *                 type: number
 *                 example: 1500
 *               estado:
 *                 type: string
 *                 example: "abierto"
 *     responses:
 *       201:
 *         description: Sesión de caja creada correctamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 * 
 *   get:
 *     summary: Obtiene todas las sesiones de caja
 *     tags: [SesionCaja]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de sesiones de caja obtenida correctamente
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /sesiones-caja/{id}:
 *   get:
 *     summary: Obtiene una sesión de caja por ID
 *     tags: [SesionCaja]
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
 *         description: Sesión de caja encontrada
 *       404:
 *         description: Sesión de caja no encontrada
 *       500:
 *         description: Error interno del servidor
 * 
 *   put:
 *     summary: Actualiza una sesión de caja existente
 *     tags: [SesionCaja]
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
 *               usuario_id:
 *                 type: integer
 *                 example: 1
 *               saldo_inicial:
 *                 type: number
 *                 example: 1000
 *               fecha_abierto:
 *                 type: string
 *                 format: date-time
 *               fecha_cierre:
 *                 type: string
 *                 format: date-time
 *               saldo_cierre:
 *                 type: number
 *               estado:
 *                 type: string
 *                 example: "cerrado"
 *     responses:
 *       200:
 *         description: Sesión de caja actualizada correctamente
 *       404:
 *         description: Sesión de caja o usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 * 
 *   delete:
 *     summary: Elimina una sesión de caja por ID
 *     tags: [SesionCaja]
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
 *         description: Sesión de caja eliminada correctamente
 *       404:
 *         description: Sesión de caja no encontrada
 *       500:
 *         description: Error interno del servidor
 */

const express = require("express");
const router = express.Router();
const sesionCajaController = require("../controllers/sesioncaja.controller");
const { protect, restrictTo } = require("../middlewares/auth");

router.post(
  "/",
  protect,
  sesionCajaController.createSesionCaja
);
router.get("/", protect, sesionCajaController.getAllSesionCajas);
router.get("/:id", protect, sesionCajaController.getSesionCajaById);
router.put(
  "/:id",
  protect,
  sesionCajaController.updateSesionCaja
);
router.delete(
  "/:id",
  protect,
  restrictTo("Administrador"),
  sesionCajaController.deleteSesionCaja
);

module.exports = router;