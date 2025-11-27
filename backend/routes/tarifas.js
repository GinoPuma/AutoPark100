/**
 * @swagger
 * tags:
 *   name: Tarifa
 *   description: Endpoints para la gestión de tarifas de estacionamiento
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Tarifa:
 *       type: object
 *       properties:
 *         tarifa_id:
 *           type: integer
 *           example: 1
 *         vehiculo_tipo_id:
 *           type: integer
 *           example: 1
 *         tipo_tarifa:
 *           type: string
 *           enum: [hora, dia, mes]
 *           example: "hora"
 *         precio:
 *           type: number
 *           example: 5.50
 *         descripcion:
 *           type: string
 *           example: "Tarifa estándar para autos"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /tarifas:
 *   post:
 *     summary: Crea una nueva tarifa
 *     tags: [Tarifa]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - vehiculo_tipo_id
 *               - tipo_tarifa
 *               - precio
 *             properties:
 *               vehiculo_tipo_id:
 *                 type: integer
 *                 example: 1
 *               tipo_tarifa:
 *                 type: string
 *                 enum: [hora, dia, mes]
 *                 example: "hora"
 *               precio:
 *                 type: number
 *                 example: 5.50
 *               descripcion:
 *                 type: string
 *                 example: "Tarifa por hora para autos"
 *     responses:
 *       201:
 *         description: Tarifa creada correctamente
 *       404:
 *         description: Tipo de vehículo no encontrado
 *       500:
 *         description: Error interno del servidor
 *
 *   get:
 *     summary: Obtiene todas las tarifas registradas
 *     tags: [Tarifa]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tarifas
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /tarifas/{id}:
 *   get:
 *     summary: Obtiene una tarifa por su ID
 *     tags: [Tarifa]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Tarifa encontrada
 *       404:
 *         description: Tarifa no encontrada
 *       500:
 *         description: Error interno del servidor
 *
 *   put:
 *     summary: Actualiza una tarifa
 *     tags: [Tarifa]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               vehiculo_tipo_id:
 *                 type: integer
 *                 example: 2
 *               tipo_tarifa:
 *                 type: string
 *                 enum: [hora, dia, mes]
 *                 example: "dia"
 *               precio:
 *                 type: number
 *                 example: 30.00
 *               descripcion:
 *                 type: string
 *                 example: "Tarifa actualizada para camionetas"
 *     responses:
 *       200:
 *         description: Tarifa actualizada
 *       404:
 *         description: Tarifa o tipo de vehículo no encontrado
 *       500:
 *         description: Error interno del servidor
 *
 *   delete:
 *     summary: Elimina una tarifa por su ID
 *     tags: [Tarifa]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       204:
 *         description: Tarifa eliminada
 *       404:
 *         description: Tarifa no encontrada
 *       500:
 *         description: Error interno del servidor
 */

const express = require("express");
const router = express.Router();
const tarifaController = require("../controllers/tarifa.controller");
const { protect, restrictTo } = require("../middlewares/auth");

router.post(
  "/",
  protect,
  restrictTo("Administrador"),
  tarifaController.createTarifa
);
router.get("/", protect, tarifaController.getAllTarifas);
router.get("/:id", protect, tarifaController.getTarifaById);
router.put(
  "/:id",
  protect,
  restrictTo("Administrador"),
  tarifaController.updateTarifa
);
router.delete(
  "/:id",
  protect,
  restrictTo("Administrador"),
  tarifaController.deleteTarifa
);

module.exports = router;
