/**
 * @swagger
 * tags:
 *   name: Zonas
 *   description: Endpoints para la gestión de zonas dentro de una sede
 */

/**
 * @swagger
 * /zona:
 *   post:
 *     summary: Crear una nueva zona
 *     tags: [Zonas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sede_id
 *               - nombre
 *             properties:
 *               sede_id:
 *                 type: integer
 *                 description: ID de la sede asociada
 *               nombre:
 *                 type: string
 *                 description: Nombre de la zona
 *               descripcion:
 *                 type: string
 *                 description: Descripción de la zona
 *     responses:
 *       201:
 *         description: Zona creada exitosamente
 *       404:
 *         description: Sede no encontrada
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /zona:
 *   get:
 *     summary: Obtener todas las zonas
 *     tags: [Zonas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de zonas obtenida exitosamente
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /zona/{id}:
 *   get:
 *     summary: Obtener una zona por ID
 *     tags: [Zonas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la zona
 *     responses:
 *       200:
 *         description: Zona encontrada exitosamente
 *       404:
 *         description: Zona no encontrada
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /zona/{id}:
 *   put:
 *     summary: Actualizar una zona existente
 *     tags: [Zonas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la zona a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sede_id:
 *                 type: integer
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *     responses:
 *       200:
 *         description: Zona actualizada exitosamente
 *       404:
 *         description: Zona o sede no encontrada
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /zona/{id}:
 *   delete:
 *     summary: Eliminar una zona
 *     tags: [Zonas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la zona a eliminar
 *     responses:
 *       204:
 *         description: Zona eliminada exitosamente
 *       404:
 *         description: Zona no encontrada
 *       500:
 *         description: Error interno del servidor
 */

const express = require("express");
const router = express.Router();
const zonaController = require("../controllers/zona.controller");
const { protect, restrictTo } = require("../middlewares/auth");

router.post(
  "/",
  protect,
  restrictTo("Administrador"),
  zonaController.createZona
);
router.get("/", protect, zonaController.getAllZonas);
router.get("/:id", protect, zonaController.getZonasById);
router.put(
  "/:id",
  protect,
  restrictTo("Administrador"),
  zonaController.updateZona
);
router.delete(
  "/:id",
  protect,
  restrictTo("Administrador"),
  zonaController.deleteZona
);

module.exports = router;
