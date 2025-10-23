/**
 * @swagger
 * tags:
 *   name: Sedes
 *   description: Endpoints para gestión de sedes
 */

/**
 * @swagger
 * /sedes:
 *   post:
 *     summary: Crea una nueva sede
 *     tags: [Sedes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               empresa_id:
 *                 type: integer
 *                 example: 1
 *               nombre:
 *                 type: string
 *                 example: "Sede Central"
 *               direccion:
 *                 type: string
 *                 example: "Av. Principal 123"
 *     responses:
 *       201:
 *         description: Sede creada exitosamente
 *       404:
 *         description: Empresa no encontrada
 *       500:
 *         description: Error interno del servidor
 * 
 *   get:
 *     summary: Obtiene todas las sedes
 *     tags: [Sedes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de sedes obtenida correctamente
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /sedes/{id}:
 *   get:
 *     summary: Obtiene una sede por ID
 *     tags: [Sedes]
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
 *         description: Sede encontrada
 *       404:
 *         description: Sede no encontrada
 *       500:
 *         description: Error interno del servidor
 * 
 *   put:
 *     summary: Actualiza una sede existente
 *     tags: [Sedes]
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
 *               empresa_id:
 *                 type: integer
 *                 example: 1
 *               nombre:
 *                 type: string
 *                 example: "Sede Nueva"
 *               direccion:
 *                 type: string
 *                 example: "Av. Secundaria 456"
 *     responses:
 *       200:
 *         description: Sede actualizada correctamente
 *       404:
 *         description: Sede o empresa no encontrada
 *       500:
 *         description: Error interno del servidor
 * 
 *   delete:
 *     summary: Elimina una sede por ID
 *     tags: [Sedes]
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
 *         description: Sede eliminada correctamente
 *       400:
 *         description: Sede no encontrada
 *       500:
 *         description: Error interno del servidor
 */

const express = require("express");
const router = express.Router();
const sedeController = require("../controllers/sede.controller");
// const { validateSede } = require("../validators/sede.validator");
const { protect, restrictTo } = require("../middlewares/auth");

router.post(
  "/",
  protect,
  restrictTo("Administrador"),
  sedeController.createSede
);
router.get(
  "/",
  protect,
  restrictTo("Administrador"),
  sedeController.getAllSede
);
router.get(
  "/:id",
  protect,
  restrictTo("Administrador"),
  sedeController.getSedeById
);
router.put(
  "/:id",
  protect,
  restrictTo("Administrador"),
  sedeController.updateSede
);
router.delete(
  "/:id",
  protect,
  restrictTo("Administrador"),
  sedeController.deleteSede
);

module.exports = router;