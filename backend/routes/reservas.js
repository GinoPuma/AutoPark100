/**
 * @swagger
 * tags:
 *   name: Reservas
 *   description: Endpoints de gestión de reservas
 */

/**
 * @swagger
 * /reservas:
 *   post:
 *     summary: Crea una nueva reserva
 *     tags: [Reservas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cliente_id:
 *                 type: integer
 *                 example: 1
 *               sede_id:
 *                 type: integer
 *                 example: 1
 *               espacio_id:
 *                 type: integer
 *                 example: 3
 *               inicio_reserva:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-10-24T10:00:00Z"
 *               fin_reserva:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-10-24T12:00:00Z"
 *               estado:
 *                 type: string
 *                 example: "pendiente"
 *               anticipo:
 *                 type: number
 *                 example: 50
 *     responses:
 *       201:
 *         description: Reserva creada exitosamente
 *       400:
 *         description: Campos requeridos o estado inválido
 *       404:
 *         description: Cliente, sede o espacio no encontrados
 *       409:
 *         description: El espacio ya está ocupado o reservado
 *
 *   get:
 *     summary: Lista todas las reservas
 *     tags: [Reservas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de reservas obtenida correctamente
 */

/**
 * @swagger
 * /reservas/{id}:
 *   get:
 *     summary: Obtiene una reserva por ID
 *     tags: [Reservas]
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
 *         description: Reserva encontrada
 *       404:
 *         description: Reserva no encontrada
 *
 *   put:
 *     summary: Actualiza una reserva existente
 *     tags: [Reservas]
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
 *               cliente_id:
 *                 type: integer
 *                 example: 2
 *               sede_id:
 *                 type: integer
 *                 example: 1
 *               espacio_id:
 *                 type: integer
 *                 example: 3
 *               inicio_reserva:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-10-24T10:00:00Z"
 *               fin_reserva:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-10-24T12:00:00Z"
 *               estado:
 *                 type: string
 *                 example: "confirmada"
 *               anticipo:
 *                 type: number
 *                 example: 100
 *     responses:
 *       200:
 *         description: Reserva actualizada correctamente
 *       400:
 *         description: Estado inválido o conflicto con tickets activos
 *       404:
 *         description: Reserva, cliente, sede o espacio no encontrado
 *
 *   delete:
 *     summary: Elimina una reserva por ID
 *     tags: [Reservas]
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
 *         description: Reserva eliminada exitosamente
 *       404:
 *         description: Reserva no encontrada
 */

const express = require("express");
const router = express.Router();
const reservaController = require("../controllers/reserva.controller");
const { protect, restrictTo } = require("../middlewares/auth");

router.post("/", protect, reservaController.createReserva);
router.get("/", protect, reservaController.getAllReservas);
router.get("/:id", protect, reservaController.getReservaById);
router.put("/:id", protect, reservaController.updateReserva);
router.delete("/:id", protect, reservaController.deleteReserva);

module.exports = router;
