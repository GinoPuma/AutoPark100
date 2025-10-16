const express = require("express");
const router = express.Router();
const rolController = require("../controllers/rol.controller");
const { protect, restrictTo } = require("../middlewares/auth");

router.post("/", protect, restrictTo("Administrador"), rolController.createRol);
router.get(
  "/",
  protect,
  restrictTo("Administrador"),
  rolController.getAllRoles
);
router.get(
  "/:id",
  protect,
  restrictTo("Administrador"),
  rolController.getRolById
);
router.put(
  "/:id",
  protect,
  restrictTo("Administrador"),
  rolController.updateRol
);
router.delete(
  "/:id",
  protect,
  restrictTo("Administrador"),
  rolController.deleteRol
);

module.exports = router;
