const express = require("express");
const router = express.Router();
const vehiculoController = require("../controllers/vehiculo.controller");
const { protect, restrictTo } = require("../middlewares/auth");

router.post("/", protect, vehiculoController.createVehiculo);
router.get("/", protect, vehiculoController.getAllVehiculos);
router.get("/:id", protect, vehiculoController.getVehiculoById);
router.put("/:id", protect, vehiculoController.updateVehiculo);
router.delete("/:id", protect, vehiculoController.deleteVehiculo);

module.exports = router;