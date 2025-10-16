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