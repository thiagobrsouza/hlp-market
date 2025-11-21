import { Router } from "express";
import { BrandController } from "../controllers/BrandController.js";

const brandRouter = Router();
const brandController = new BrandController();

brandRouter.post('/api/brands', (req, res) => brandController.create(req, res));
brandRouter.get('/api/brands', (req, res) => brandController.findAll(req, res));
brandRouter.get('/api/brands/:id', (req, res) => brandController.findById(req, res));
brandRouter.put('/api/brands/:id', (req, res) => brandController.update(req, res));
brandRouter.delete('/api/brands/:id', (req, res) => brandController.deleteOne(req, res));

export { brandRouter };