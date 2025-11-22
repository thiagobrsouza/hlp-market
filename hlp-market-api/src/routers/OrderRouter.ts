import { Router } from "express";
import { OrderController } from "../controllers/OrderController.js";

const orderRouter = Router();
const orderController = new OrderController();

orderRouter.post('/api/orders', (req, res) => orderController.create(req, res));
orderRouter.get('/api/orders', (req, res) => orderController.findAll(req, res));
orderRouter.get('/api/orders/:id', (req, res) => orderController.findById(req, res));
orderRouter.put('/api/orders/:id', (req, res) => orderController.update(req, res));
orderRouter.delete('/api/orders/:id', (req, res) => orderController.deleteOne(req, res));
orderRouter.delete('/api/orders/:id/items/:itemId', (req, res) => orderController.deleteOrderItem(req, res));

export { orderRouter };