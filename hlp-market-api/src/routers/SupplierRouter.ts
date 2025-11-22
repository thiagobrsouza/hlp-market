import { Router } from "express";
import { SupplierController } from "../controllers/SupplierController.js";

const supplierRouter = Router();
const supplierController = new SupplierController();

supplierRouter.post('/api/suppliers', (req, res) => supplierController.create(req, res));
supplierRouter.get('/api/suppliers', (req, res) => supplierController.findAll(req, res));
supplierRouter.get('/api/suppliers/:id', (req, res) => supplierController.findById(req, res));
supplierRouter.put('/api/suppliers/:id', (req, res) => supplierController.update(req, res));
supplierRouter.delete('/api/suppliers/:id', (req, res) => supplierController.deleteOne(req, res));

export { supplierRouter };