import { Router } from "express";
import { SupplierController } from "../controllers/SupplierController.js";
import { authMiddleware } from "../middlewares/auth.js";
import { hasPermission } from "../middlewares/permission.js";
import { Profile } from "../../generated/prisma/enums.js";

const supplierRouter = Router();
const supplierController = new SupplierController();

const ROLES = [Profile.ADMINISTRADOR, Profile.ESTOQUISTA];

supplierRouter.post('/api/suppliers', authMiddleware, hasPermission(ROLES), (req, res) => supplierController.create(req, res));
supplierRouter.get('/api/suppliers', authMiddleware, hasPermission(ROLES), (req, res) => supplierController.findAll(req, res));
supplierRouter.get('/api/suppliers/:id', authMiddleware, hasPermission(ROLES), (req, res) => supplierController.findById(req, res));
supplierRouter.put('/api/suppliers/:id', authMiddleware, hasPermission(ROLES), (req, res) => supplierController.update(req, res));
supplierRouter.delete('/api/suppliers/:id', authMiddleware, hasPermission(ROLES), (req, res) => supplierController.deleteOne(req, res));

export { supplierRouter };