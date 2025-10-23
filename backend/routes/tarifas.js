/**
 * @swagger
 * tags:
 *   name: Tarifa
 *   description: Endpoints para la gestión de tarifas de vehículos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Tarifa:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         vehiculo_tipo_id:
 *           type: integer
 *           example: 1
 *         precio_hora:
 *           type: number
 *           example: 5.5
 *         precio_dia:
 *           type: number
 *           example: 40
 *         precio_mes:
 *           type: number
 *           example: 800
 *         descripcion:
 *           type: string
 *           example: "Tarifa para autos pequeños"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-10-23T15:00:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2025-10-23T15:00:00Z"
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
 *               - precio_hora
 *             properties:
 *               vehiculo_tipo_id:
 *                 type: integer
 *                 example: 1
 *               precio_hora:
 *                 type: number
 *                 example: 5.5
 *               precio_dia:
 *                 type: number
 *                 example: 40
 *               precio_mes:
 *                 type: number
 *                 example: 800
 *               descripcion:
 *                 type: string
 *                 example: "Tarifa para autos pequeños"
 *     responses:
 *       201:
 *         description: Tarifa creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tarifa'
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
 *         description: Lista de todas las tarifas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tarifa'
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /tarifas/{id}:
 *   get:
 *     summary: Obtiene una tarifa específica por su ID
 *     tags: [Tarifa]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID de la tarifa a consultar
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Tarifa encontrada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tarifa'
 *       404:
 *         description: Tarifa no encontrada
 *       500:
 *         description: Error interno del servidor
 *
 *   put:
 *     summary: Actualiza una tarifa existente
 *     tags: [Tarifa]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID de la tarifa a actualizar
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
 *               precio_hora:
 *                 type: number
 *                 example: 6.0
 *               precio_dia:
 *                 type: number
 *                 example: 45
 *               precio_mes:
 *                 type: number
 *                 example: 900
 *               descripcion:
 *                 type: string
 *                 example: "Tarifa actualizada para camionetas"
 *     responses:
 *       200:
 *         description: Tarifa actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tarifa'
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
 *         description: ID de la tarifa a eliminar
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       204:
 *         description: Tarifa eliminada correctamente (sin contenido)
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
