/**
 * @swagger
 * tags:
 *   name: Vehiculo
 *   description: Endpoints para la gestión de vehículos
 */

/**
 * @swagger
 * /vehiculo:
 *   post:
 *     summary: Crea un nuevo vehículo
 *     tags: [Vehiculo]
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
 *               reserva_id:
 *                 type: integer
 *                 example: 3
 *               placa:
 *                 type: string
 *                 example: "ABC-123"
 *               descripcion:
 *                 type: string
 *                 example: "Vehículo SUV color negro"
 *     responses:
 *       201:
 *         description: Vehículo creado correctamente
 *       404:
 *         description: Tipo de vehículo o reserva no encontrados
 *       500:
 *         description: Error interno del servidor
 *
 *   get:
 *     summary: Obtiene todos los vehículos
 *     tags: [Vehiculo]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de vehículos
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /vehiculo/{id}:
 *   get:
 *     summary: Obtiene un vehículo por ID
 *     tags: [Vehiculo]
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
 *         description: Vehículo encontrado
 *       404:
 *         description: Vehículo no encontrado
 *       500:
 *         description: Error interno del servidor
 *
 *   put:
 *     summary: Actualiza un vehículo por ID
 *     tags: [Vehiculo]
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
 *                 example: 1
 *               reserva_id:
 *                 type: integer
 *                 example: 3
 *               placa:
 *                 type: string
 *                 example: "XYZ-987"
 *               descripcion:
 *                 type: string
 *                 example: "Vehículo actualizado, color azul"
 *     responses:
 *       200:
 *         description: Vehículo actualizado correctamente
 *       404:
 *         description: Vehículo, tipo o reserva no encontrados
 *       500:
 *         description: Error interno del servidor
 *
 *   delete:
 *     summary: Elimina un vehículo por ID
 *     tags: [Vehiculo]
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
 *         description: Vehículo eliminado correctamente
 *       404:
 *         description: Vehículo no encontrado
 *       500:
 *         description: Error interno del servidor
 */

const express = require("express");
const router = express.Router();
const vehiculoController = require("../controllers/vehiculo.controller");
const { protect, restrictTo } = require("../middlewares/auth");

router.post("/", protect, vehiculoController.createVehiculo);
router.get("/", protect, vehiculoController.getAllVehiculos);
router.get("/:id", protect, vehiculoController.getVehiculoById);
router.put("/:id", protect, vehiculoController.updateVehiculo);
router.delete("/:id", protect, vehiculoController.deleteVehiculo);

module.exports = router;
