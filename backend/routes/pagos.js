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