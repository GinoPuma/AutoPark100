/**
 * @swagger
 * tags:
 *   name: MetodosPago
 *   description: Endpoints de gestión de métodos de pago
 */

/**
 * @swagger
 * /metodos-pagos:
 *   post:
 *     summary: Crea un nuevo método de pago
 *     tags: [MetodosPago]
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
 *                 example: "Tarjeta de Crédito"
 *     responses:
 *       201:
 *         description: Método de pago creado exitosamente
 *       400:
 *         description: Error de validación
 *   get:
 *     summary: Lista todos los métodos de pago
 *     tags: [MetodosPago]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de métodos de pago obtenida correctamente
 */

/**
 * @swagger
 * /metodos-pagos/{id}:
 *   get:
 *     summary: Obtiene un método de pago por ID
 *     tags: [MetodosPago]
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
 *         description: Método de pago encontrado
 *       404:
 *         description: Método de pago no encontrado
 *
 *   put:
 *     summary: Actualiza un método de pago existente
 *     tags: [MetodosPago]
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
 *                 example: "Transferencia Bancaria"
 *     responses:
 *       200:
 *         description: Método de pago actualizado correctamente
 *       404:
 *         description: Método de pago no encontrado
 *
 *   delete:
 *     summary: Elimina un método de pago por ID
 *     tags: [MetodosPago]
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
 *         description: Método de pago eliminado exitosamente
 *       404:
 *         description: Método de pago no encontrado
 */

const express = require("express");
const router = express.Router();
const metodosPagoController = require("../controllers/metodospago.controller");
const { protect, restrictTo } = require("../middlewares/auth");
// const { validateMetodosPago } = require('../validators/metodospago.validator');

router.post(
  "/",
  protect,
  restrictTo("Administrador"),
  metodosPagoController.createMetodoPago
);
router.get("/", protect, metodosPagoController.getAllMetodosPago);
router.get("/:id", protect, metodosPagoController.getMetodoPagobyId);
router.put(
  "/",
  protect,
  restrictTo("Administrador"),
  metodosPagoController.updateMetodoPago
);
router.delete(
  "/",
  protect,
  restrictTo("Administrador"),
  metodosPagoController.deleteMetodoPago
);

module.exports = router;
