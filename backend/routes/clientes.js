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