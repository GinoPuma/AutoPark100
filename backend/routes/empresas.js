/**
 * @swagger
 * tags:
 *   name: Empresas
 *   description: Endpoints de gestión de empresas
 */

/**
 * @swagger
 * /empresas:
 *   post:
 *     summary: Crea una nueva empresa
 *     tags: [Empresas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ruc:
 *                 type: string
 *                 example: "20481234567"
 *               razon_social:
 *                 type: string
 *                 example: "Empresa Ejemplo S.A.C."
 *     responses:
 *       201:
 *         description: Empresa creada exitosamente
 *       400:
 *         description: Error de validación
 *
 *   get:
 *     summary: Lista todas las empresas
 *     tags: [Empresas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de empresas obtenida correctamente
 */

/**
 * @swagger
 * /empresas/{id}:
 *   get:
 *     summary: Obtiene una empresa por su ID
 *     tags: [Empresas]
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
 *         description: Empresa encontrada
 *       404:
 *         description: Empresa no encontrada
 *
 *   put:
 *     summary: Actualiza una empresa existente
 *     tags: [Empresas]
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
 *               ruc:
 *                 type: string
 *                 example: "20481234567"
 *               razon_social:
 *                 type: string
 *                 example: "Nueva Razón Social S.A.C."
 *     responses:
 *       200:
 *         description: Empresa actualizada correctamente
 *       404:
 *         description: Empresa no encontrada
 *
 *   delete:
 *     summary: Elimina una empresa por ID
 *     tags: [Empresas]
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
 *         description: Empresa eliminada exitosamente
 *       404:
 *         description: Empresa no encontrada
 */

const express = require("express");
const router = express.Router();
const empresaController = require("../controllers/empresa.controller");
const { validateEmpresa } = require("../validators/empresa.validator");
const { protect, restrictTo } = require("../middlewares/auth");

router.post(
  "/",
  protect,
  restrictTo("Administrador"),
  validateEmpresa,
  empresaController.createEmpresa
);
router.get("/", protect, empresaController.getAllEmpresas);
router.get("/:id", protect, empresaController.getEmpresaById);
router.put(
  "/:id",
  protect,
  restrictTo("Administrador"),
  validateEmpresa,
  empresaController.updateEmpresa
);
router.delete(
  "/:id",
  protect,
  restrictTo("Administrador"),
  empresaController.deleteEmpresa
);

module.exports = router;
