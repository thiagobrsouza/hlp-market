import { Router } from "express";
import { InvoiceController } from "../controllers/InvoiceController.js";

const invoiceRouter = Router();
const invoiceController = new InvoiceController();

invoiceRouter.post('/api/invoices', (req, res) => invoiceController.create(req, res));
invoiceRouter.get('/api/invoices', (req, res) => invoiceController.findAll(req, res));
invoiceRouter.get('/api/invoices/:id', (req, res) => invoiceController.findById(req, res));
invoiceRouter.put('/api/invoices/:id', (req, res) => invoiceController.update(req, res));
invoiceRouter.delete('/api/invoices/:id', (req, res) => invoiceController.deleteOne(req, res));

export { invoiceRouter };