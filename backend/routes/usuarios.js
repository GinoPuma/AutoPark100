/**
 * @swagger
 * tags:
 *   name: Usuario
 *   description: Endpoints para gestión de usuarios
 */

/**
 * @swagger
 * /usuario:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [Usuario]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rol_id:
 *                 type: integer
 *                 example: 1
 *               empresa_id:
 *                 type: integer
 *                 example: 2
 *               nombre:
 *                 type: string
 *                 example: "Juan Perez"
 *               username:
 *                 type: string
 *                 example: "juanp"
 *               correo:
 *                 type: string
 *                 example: "juanp@mail.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *               estado:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 *       404:
 *         description: Rol o empresa no encontrados
 *       500:
 *         description: Error interno del servidor
 *
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags: [Usuario]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /usuario/{id}:
 *   get:
 *     summary: Obtiene un usuario por ID
 *     tags: [Usuario]
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
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 *
 *   put:
 *     summary: Actualiza un usuario por ID
 *     tags: [Usuario]
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
 *               rol_id:
 *                 type: integer
 *               empresa_id:
 *                 type: integer
 *               nombre:
 *                 type: string
 *               username:
 *                 type: string
 *               correo:
 *                 type: string
 *               password:
 *                 type: string
 *               estado:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *       404:
 *         description: Usuario, rol o empresa no encontrados
 *       500:
 *         description: Error interno del servidor
 *
 *   delete:
 *     summary: Elimina un usuario por ID
 *     tags: [Usuario]
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
 *         description: Usuario eliminado correctamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */

const express = require("express");
const router = express.Router();
const { protect, restrictTo } = require("../middlewares/auth");
const usuarioController = require("../controllers/usuario.controller");

router.post(
  "/",
  protect,
  restrictTo("Administrador"),
  usuarioController.createUsuario
);
router.get(
  "/",
  protect,
  restrictTo("Administrador"),
  usuarioController.getAllUsuarios
);
router.get(
  "/:id",
  protect,
  restrictTo("Administrador"),
  usuarioController.getUsuarioById
);
router.put(
  "/:id",
  protect,
  restrictTo("Administrador"),
  usuarioController.updateUsuario
);
router.delete(
  "/:id",
  protect,
  restrictTo("Administrador"),
  usuarioController.deleteUsuario
);

module.exports = router;
