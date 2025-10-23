/**
 * @swagger
 * tags:
 *   name: VehiculoTipos
 *   description: Endpoints para la gestión de tipos de vehículos
 */

/**
 * @swagger
 * /vehiculo-tipo:
 *   post:
 *     summary: Crear un nuevo tipo de vehículo
 *     tags: [VehiculoTipos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del tipo de vehículo
 *               descripcion:
 *                 type: string
 *                 description: Descripción del tipo de vehículo
 *     responses:
 *       201:
 *         description: Tipo de vehículo creado exitosamente
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /vehiculo-tipo:
 *   get:
 *     summary: Obtener todos los tipos de vehículos
 *     tags: [VehiculoTipos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tipos de vehículos
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /vehiculo-tipo/{id}:
 *   get:
 *     summary: Obtener un tipo de vehículo por ID
 *     tags: [VehiculoTipos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del tipo de vehículo
 *     responses:
 *       200:
 *         description: Tipo de vehículo encontrado
 *       404:
 *         description: Tipo de vehículo no encontrado
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /vehiculo-tipo/{id}:
 *   put:
 *     summary: Actualizar un tipo de vehículo
 *     tags: [VehiculoTipos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del tipo de vehículo a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tipo de vehículo actualizado exitosamente
 *       404:
 *         description: Tipo de vehículo no encontrado
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /vehiculo-tipo/{id}:
 *   delete:
 *     summary: Eliminar un tipo de vehículo
 *     tags: [VehiculoTipos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del tipo de vehículo a eliminar
 *     responses:
 *       204:
 *         description: Tipo de vehículo eliminado exitosamente
 *       404:
 *         description: Tipo de vehículo no encontrado
 *       500:
 *         description: Error interno del servidor
 */

const express = require("express");
const router = express.Router();
const vehiculoTipoController = require("../controllers/vehiculoTipo.controller");
const { protect, restrictTo } = require("../middlewares/auth");

router.post(
  "/",
  protect,
  restrictTo("Administrador"),
  vehiculoTipoController.createVehiculoTipo
);
router.get("/", protect, vehiculoTipoController.getAllVehiculoTipos);
router.get("/:id", protect, vehiculoTipoController.getVehiculoTipoById);
router.put(
  "/:id",
  protect,
  restrictTo("Administrador"),
  vehiculoTipoController.updateVehiculoTipo
);
router.delete(
  "/:id",
  protect,
  restrictTo("Administrador"),
  vehiculoTipoController.deleteVehiculoTipo
);

module.exports = router;
