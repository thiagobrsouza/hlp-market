import { Router } from "express";
import { CustomerController } from "../controllers/CustomerController.js";

const customerRouter = Router();
const customerController = new CustomerController();

customerRouter.post('/api/customers', (req, res) => customerController.create(req, res));
customerRouter.get('/api/customers', (req, res) => customerController.findAll(req, res));
customerRouter.get('/api/customers/:id', (req, res) => customerController.findById(req, res));
customerRouter.put('/api/customers/:id', (req, res) => customerController.update(req, res));
customerRouter.delete('/api/customers/:id', (req, res) => customerController.deleteOne(req, res));

export { customerRouter };