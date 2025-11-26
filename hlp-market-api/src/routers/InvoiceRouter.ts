import { Router } from "express";
import { InvoiceController } from "../controllers/InvoiceController.js";
import { authMiddleware } from "../middlewares/auth.js";
import { hasPermission } from "../middlewares/permission.js";
import { Profile } from "../../generated/prisma/enums.js";

const invoiceRouter = Router();
const invoiceController = new InvoiceController();

const ROLES = [Profile.ADMINISTRADOR, Profile.ESTOQUISTA];

invoiceRouter.post('/api/invoices', authMiddleware, hasPermission(ROLES), (req, res) => invoiceController.create(req, res));
invoiceRouter.get('/api/invoices', authMiddleware, hasPermission(ROLES), (req, res) => invoiceController.findAll(req, res));
invoiceRouter.get('/api/invoices/:id', authMiddleware, hasPermission(ROLES), (req, res) => invoiceController.findById(req, res));
invoiceRouter.put('/api/invoices/:id', authMiddleware, hasPermission(ROLES), (req, res) => invoiceController.update(req, res));
invoiceRouter.delete('/api/invoices/:id', authMiddleware, hasPermission(ROLES), (req, res) => invoiceController.deleteOne(req, res));

export { invoiceRouter };