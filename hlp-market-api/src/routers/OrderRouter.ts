import { Router } from "express";
import { OrderController } from "../controllers/OrderController.js";
import { authMiddleware } from "../middlewares/auth.js";
import { hasPermission } from "../middlewares/permission.js";
import { Profile } from "../../generated/prisma/enums.js";

const orderRouter = Router();
const orderController = new OrderController();

const ROLES = [Profile.ADMINISTRADOR, Profile.VENDEDOR];

orderRouter.post('/api/orders', authMiddleware, hasPermission(ROLES), (req, res) => orderController.create(req, res));
orderRouter.get('/api/orders', authMiddleware, hasPermission(ROLES), (req, res) => orderController.findAll(req, res));
orderRouter.get('/api/orders/:id', authMiddleware, hasPermission(ROLES), (req, res) => orderController.findById(req, res));
orderRouter.put('/api/orders/:id', authMiddleware, hasPermission(ROLES), (req, res) => orderController.update(req, res));
orderRouter.delete('/api/orders/:id', authMiddleware, hasPermission(ROLES), (req, res) => orderController.deleteOne(req, res));
orderRouter.delete('/api/orders/:id/items/:itemId', authMiddleware, hasPermission(ROLES), (req, res) => orderController.deleteOrderItem(req, res));

export { orderRouter };