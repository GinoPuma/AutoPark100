/**
 * @swagger
 * tags:
 *   name: Pagos
 *   description: Endpoints de gestión de pagos
 */

/**
 * @swagger
 * /pagos:
 *   post:
 *     summary: Crea un nuevo pago
 *     tags: [Pagos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               metodo_pago_id:
 *                 type: integer
 *                 example: 1
 *               ticket_id:
 *                 type: integer
 *                 example: 1
 *               monto:
 *                 type: number
 *                 example: 150.50
 *               referencia:
 *                 type: string
 *                 example: "Pago en efectivo"
 *     responses:
 *       201:
 *         description: Pago creado exitosamente
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Método de pago o ticket no encontrado
 *
 *   get:
 *     summary: Lista todos los pagos
 *     tags: [Pagos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pagos obtenida correctamente
 */

/**
 * @swagger
 * /pagos/{id}:
 *   get:
 *     summary: Obtiene un pago por ID
 *     tags: [Pagos]
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
 *         description: Pago encontrado
 *       404:
 *         description: Pago no encontrado
 *
 *   put:
 *     summary: Actualiza un pago existente
 *     tags: [Pagos]
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
 *               metodo_pago_id:
 *                 type: integer
 *                 example: 2
 *               ticket_id:
 *                 type: integer
 *                 example: 3
 *               monto:
 *                 type: number
 *                 example: 200
 *               referencia:
 *                 type: string
 *                 example: "Pago con tarjeta"
 *     responses:
 *       200:
 *         description: Pago actualizado correctamente
 *       404:
 *         description: Pago, método de pago o ticket no encontrado
 *
 *   delete:
 *     summary: Elimina un pago por ID
 *     tags: [Pagos]
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
 *         description: Pago eliminado exitosamente
 *       400:
 *         description: No se puede eliminar un pago de un ticket cerrado
 *       404:
 *         description: Pago no encontrado
 */

const express = require("express");
const router = express.Router();
const pagoController = require("../controllers/pago.controller");
const { protect, restrictTo } = require("../middlewares/auth");

router.post("/", protect, pagoController.createPago);
router.get("/", protect, pagoController.getAllPagos);
router.get("/:id", protect, pagoController.getPagoById);
router.put("/:id", protect, pagoController.updatePagoById);
router.delete("/:id", protect, pagoController.deletePagoById);

module.exports = router;
