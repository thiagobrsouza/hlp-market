import { Router } from "express";
import { CategoryController } from "../controllers/CategoryController.js";

const categoryRouter = Router();
const categoryController = new CategoryController();

categoryRouter.post('/api/categories', (req, res) => categoryController.create(req, res));
categoryRouter.get('/api/categories', (req, res) => categoryController.findAll(req, res));
categoryRouter.get('/api/categories/:id', (req, res) => categoryController.findById(req, res));
categoryRouter.put('/api/categories/:id', (req, res) => categoryController.update(req, res));
categoryRouter.delete('/api/categories/:id', (req, res) => categoryController.deleteOne(req, res));

export { categoryRouter };