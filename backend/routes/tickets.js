/**
 * @swagger
 * tags:
 *   name: Ticket
 *   description: Endpoints para gestión de tickets
 */

/**
 * @swagger
 * /tickets:
 *   post:
 *     summary: Crea un nuevo ticket
 *     tags: [Ticket]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               espacio_id:
 *                 type: integer
 *                 example: 1
 *               vehiculo_id:
 *                 type: integer
 *                 example: 3
 *               tarifa_id:
 *                 type: integer
 *                 example: 2
 *               fecha_entrada:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-10-23T09:00:00Z"
 *               estado:
 *                 type: string
 *                 example: "activo"
 *     responses:
 *       201:
 *         description: Ticket creado correctamente
 *       404:
 *         description: Espacio, vehículo o tarifa no encontrados
 *       500:
 *         description: Error interno del servidor
 *
 *   get:
 *     summary: Obtiene todos los tickets
 *     tags: [Ticket]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tickets
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /tickets/{id}:
 *   get:
 *     summary: Obtiene un ticket por ID
 *     tags: [Ticket]
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
 *         description: Ticket encontrado
 *       404:
 *         description: Ticket no encontrado
 *       500:
 *         description: Error interno del servidor
 *
 *   put:
 *     summary: Actualiza un ticket por ID
 *     tags: [Ticket]
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
 *               espacio_id:
 *                 type: integer
 *               vehiculo_id:
 *                 type: integer
 *               tarifa_id:
 *                 type: integer
 *               fecha_entrada:
 *                 type: string
 *                 format: date-time
 *               fecha_salida:
 *                 type: string
 *                 format: date-time
 *               estado:
 *                 type: string
 *               monto_total:
 *                 type: number
 *     responses:
 *       200:
 *         description: Ticket actualizado correctamente
 *       404:
 *         description: Ticket no encontrado
 *       500:
 *         description: Error interno del servidor
 *
 *   delete:
 *     summary: Elimina un ticket por ID
 *     tags: [Ticket]
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
 *         description: Ticket eliminado correctamente
 *       404:
 *         description: Ticket no encontrado
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /tickets/{id}/cerrar:
 *   post:
 *     summary: Cierra un ticket y calcula el monto total
 *     description: Calcula la tarifa según el tipo (hora, día o mes), registra la fecha de salida y cambia el estado del ticket a "cerrado"
 *     tags: [Ticket]
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
 *         description: Ticket cerrado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ticketId:
 *                   type: integer
 *                   example: 12
 *                 entrada:
 *                   type: string
 *                   format: date-time
 *                 salida:
 *                   type: string
 *                   format: date-time
 *                 tipo:
 *                   type: string
 *                   example: "HORA"
 *                 precio:
 *                   type: number
 *                   example: 5
 *                 total:
 *                   type: number
 *                   example: 15
 *       404:
 *         description: Ticket no encontrado
 *       500:
 *         description: Error interno del servidor
 */

const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticket.controller");
const { protect, restrictTo } = require("../middlewares/auth");

router.post("/", protect, ticketController.createTicket);
router.get("/", protect, ticketController.getAllTickets);
router.get("/:id", protect, ticketController.getTicketById);
router.put("/:id", protect, ticketController.updateTicket);
router.delete("/:id", protect, ticketController.deleteTicket);
router.post("/:id/cerrar", protect, ticketController.cerrarTicket);

module.exports = router;
