/**
 * @swagger
 * tags:
 *   name: Clientes
 *   description: Endpoints de gestión de clientes
 */

/**
 * @swagger
 * /clientes:
 *   post:
 *     summary: Crea un nuevo cliente
 *     tags: [Clientes]
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
 *               doc_tipo:
 *                 type: string
 *                 example: "DNI"
 *               doc_num:
 *                 type: string
 *                 example: "12345678"
 *               nombre:
 *                 type: string
 *                 example: "Juan"
 *               apellido:
 *                 type: string
 *                 example: "Pérez"
 *               email:
 *                 type: string
 *                 example: "juan.perez@gmail.com"
 *               telefono:
 *                 type: string
 *                 example: "987654321"
 *     responses:
 *       201:
 *         description: Cliente creado exitosamente
 *       400:
 *         description: Error de validación
 *   get:
 *     summary: Lista todos los clientes
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de clientes obtenida correctamente
 */

/**
 * @swagger
 * /clientes/{id}:
 *   get:
 *     summary: Obtiene un cliente por ID
 *     tags: [Clientes]
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
 *         description: Cliente encontrado
 *       404:
 *         description: Cliente no encontrado
 *
 *   put:
 *     summary: Actualiza un cliente existente
 *     tags: [Clientes]
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
 *               doc_tipo:
 *                 type: string
 *                 example: "DNI"
 *               doc_num:
 *                 type: string
 *                 example: "12345678"
 *               nombre:
 *                 type: string
 *                 example: "Juan"
 *               apellido:
 *                 type: string
 *                 example: "Pérez"
 *               email:
 *                 type: string
 *                 example: "juan.perez@gmail.com"
 *               telefono:
 *                 type: string
 *                 example: "987654321"
 *     responses:
 *       200:
 *         description: Cliente actualizado correctamente
 *       404:
 *         description: Cliente no encontrado
 *
 *   delete:
 *     summary: Elimina un cliente por ID
 *     tags: [Clientes]
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
 *         description: Cliente eliminado exitosamente
 *       404:
 *         description: Cliente no encontrado
 */

const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/cliente.controller");
// const { validateCliente } = require("../validators/cliente.validator");
const { protect, restrictTo } = require("../middlewares/auth");

router.post("/", protect, clienteController.createCliente);
router.get("/", protect, clienteController.getAllCliente);
router.get("/:id", protect, clienteController.getClienteById);
router.put("/:id", protect, clienteController.updateCliente);
router.delete("/:id", protect, clienteController.deleteCliente);

module.exports = router;
