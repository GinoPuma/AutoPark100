/**
 * @swagger
 * tags:
 *   name: Autenticación
 *   description: Endpoints para el registro, inicio de sesión y gestión de usuarios autenticados
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Registra un nuevo usuario en el sistema
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               username:
 *                 type: string
 *               correo:
 *                 type: string
 *               password:
 *                 type: string
 *               rol_id:
 *                 type: integer
 *               empresa_id:
 *                 type: integer
 *             example:
 *               nombre: "Juan Pérez"
 *               username: "juanperez"
 *               correo: "juanperez@correo.com"
 *               password: "123456"
 *               rol_id: 1
 *               empresa_id: 2
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Datos inválidos o usuario existente
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Inicia sesión con las credenciales del usuario
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correo:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               username: "juanperez"
 *               password: "123456"
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso, retorna token JWT
 *       401:
 *         description: Credenciales inválidas
 */

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Cierra la sesión del usuario autenticado
 *     tags: [Autenticación]
 *     responses:
 *       200:
 *         description: Sesión cerrada correctamente
 *       401:
 *         description: No hay sesión activa
 */

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Obtiene la información del usuario autenticado
 *     tags: [Autenticación]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Datos del usuario autenticado
 *       401:
 *         description: No autenticado o token inválido
 */

const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { protect } = require("../middlewares/auth");
const {
  validateSignup,
  validateLogin,
} = require("../validators/auth.validators");

// --- Definir Rutas ---
router.post("/signup", validateSignup, authController.signup);
router.post("/login", validateLogin, authController.login);
router.post("/logout", authController.logout);
router.get("/me", protect, authController.getMe);

module.exports = router;
