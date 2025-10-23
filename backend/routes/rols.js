/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Endpoints para gestión de roles
 */

/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Crea un nuevo rol
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Administrador"
 *     responses:
 *       201:
 *         description: Rol creado exitosamente
 *       400:
 *         description: Falta el nombre del rol
 *       500:
 *         description: Error interno del servidor
 *
 *   get:
 *     summary: Obtiene todos los roles
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de roles obtenida correctamente
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /roles/{id}:
 *   get:
 *     summary: Obtiene un rol por ID
 *     tags: [Roles]
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
 *         description: Rol encontrado
 *       404:
 *         description: Rol no encontrado
 *       500:
 *         description: Error interno del servidor
 *
 *   put:
 *     summary: Actualiza un rol existente
 *     tags: [Roles]
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
 *               nombre:
 *                 type: string
 *                 example: "Supervisor"
 *     responses:
 *       200:
 *         description: Rol actualizado correctamente
 *       404:
 *         description: Rol no encontrado
 *       500:
 *         description: Error interno del servidor
 *
 *   delete:
 *     summary: Elimina un rol por ID
 *     tags: [Roles]
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
 *         description: Rol eliminado correctamente
 *       404:
 *         description: Rol no encontrado
 *       500:
 *         description: Error interno del servidor
 */

const express = require("express");
const router = express.Router();
const rolController = require("../controllers/rol.controller");
const { protect, restrictTo } = require("../middlewares/auth");

router.post("/", protect, restrictTo("Administrador"), rolController.createRol);
router.get(
  "/",
  protect,
  restrictTo("Administrador"),
  rolController.getAllRoles
);
router.get(
  "/:id",
  protect,
  restrictTo("Administrador"),
  rolController.getRolById
);
router.put(
  "/:id",
  protect,
  restrictTo("Administrador"),
  rolController.updateRol
);
router.delete(
  "/:id",
  protect,
  restrictTo("Administrador"),
  rolController.deleteRol
);

module.exports = router;
