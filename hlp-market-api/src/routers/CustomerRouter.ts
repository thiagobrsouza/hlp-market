import { Router } from "express";
import { CustomerController } from "../controllers/CustomerController.js";
import { authMiddleware } from "../middlewares/auth.js";
import { hasPermission } from "../middlewares/permission.js";
import { Profile } from "../../generated/prisma/enums.js";

const customerRouter = Router();
const customerController = new CustomerController();

const ROLES = [Profile.ADMINISTRADOR, Profile.VENDEDOR];

customerRouter.post('/api/customers', authMiddleware, hasPermission(ROLES), (req, res) => customerController.create(req, res));
customerRouter.get('/api/customers', authMiddleware, hasPermission(ROLES), (req, res) => customerController.findAll(req, res));
customerRouter.get('/api/customers/:id', authMiddleware, hasPermission(ROLES), (req, res) => customerController.findById(req, res));
customerRouter.put('/api/customers/:id', authMiddleware, hasPermission(ROLES), (req, res) => customerController.update(req, res));
customerRouter.delete('/api/customers/:id', authMiddleware, hasPermission(ROLES), (req, res) => customerController.deleteOne(req, res));

export { customerRouter };