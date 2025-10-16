const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticket.controller");
const { protect, restrictTo } = require("../middlewares/auth");

router.post("/", protect, ticketController.createTicket);
router.get("/", protect, ticketController.getAllTickets);
router.get("/:id", protect, ticketController.getTicketById);
router.put("/:id", protect, ticketController.updateTicket);
router.delete("/:id", protect, ticketController.deleteTicket);

module.exports = router;