import { Router } from "express";
import { ProductController } from "../controllers/ProductController.js";

const productRouter = Router();
const productController = new ProductController();

productRouter.post('/api/products', (req, res) => productController.create(req, res));
productRouter.get('/api/products', (req, res) => productController.findAll(req, res));
productRouter.get('/api/products/:id', (req, res) => productController.findById(req, res));
productRouter.put('/api/products/:id', (req, res) => productController.update(req, res));
productRouter.delete('/api/products/:id', (req, res) => productController.deleteOne(req, res));

export { productRouter };