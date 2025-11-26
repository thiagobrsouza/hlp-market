import { Router } from "express";
import { StockController } from "../controllers/StockController.js";
import { authMiddleware } from "../middlewares/auth.js";
import { hasPermission } from "../middlewares/permission.js";
import { Profile } from "../../generated/prisma/enums.js";

const stockRouter = Router();
const stockController = new StockController();

const ROLES = [Profile.ADMINISTRADOR, Profile.ESTOQUISTA];

stockRouter.post('/api/stock', authMiddleware, hasPermission(ROLES), (req, res) => stockController.create(req, res));
stockRouter.get('/api/stock', authMiddleware, hasPermission(ROLES), (req, res) => stockController.findAll(req, res));
stockRouter.get('/api/stock/:id', authMiddleware, hasPermission(ROLES), (req, res) => stockController.findById(req, res));
stockRouter.put('/api/stock/:id', authMiddleware, hasPermission(ROLES), (req, res) => stockController.update(req, res));
stockRouter.delete('/api/stock/:id', authMiddleware, hasPermission(ROLES), (req, res) => stockController.deleteOne(req, res));

export { stockRouter };