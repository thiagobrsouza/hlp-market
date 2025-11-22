import { Router } from "express";
import { StockController } from "../controllers/StockController.js";

const stockRouter = Router();
const stockController = new StockController();

stockRouter.post('/api/stock', (req, res) => stockController.create(req, res));
stockRouter.get('/api/stock', (req, res) => stockController.findAll(req, res));
stockRouter.get('/api/stock/:id', (req, res) => stockController.findById(req, res));
stockRouter.put('/api/stock/:id', (req, res) => stockController.update(req, res));
stockRouter.delete('/api/stock/:id', (req, res) => stockController.deleteOne(req, res));

export { stockRouter };