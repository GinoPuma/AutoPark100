/**
 * @swagger
 * tags:
 *   name: Tarifa
 *   description: Endpoints para gestión de tarifas
 */

/**
 * @swagger
 * /tarifa:
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
 *       404:
 *         description: Tipo de vehículo no encontrado
 *       500:
 *         description: Error interno del servidor
 *
 *   get:
 *     summary: Obtiene todas las tarifas
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
 * /tarifa/{id}:
 *   get:
 *     summary: Obtiene una tarifa por ID
 *     tags: [Tarifa]
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               vehiculo_tipo_id:
 *                 type: integer
 *               precio_hora:
 *                 type: number
 *               precio_dia:
 *                 type: number
 *               precio_mes:
 *                 type: number
 *               descripcion:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tarifa actualizada correctamente
 *       404:
 *         description: Tarifa o tipo de vehículo no encontrado
 *       500:
 *         description: Error interno del servidor
 *
 *   delete:
 *     summary: Elimina una tarifa por ID
 *     tags: [Tarifa]
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
 *         description: Tarifa eliminada correctamente
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