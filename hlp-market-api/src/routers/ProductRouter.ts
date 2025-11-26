import { Router } from "express";
import { ProductController } from "../controllers/ProductController.js";
import { authMiddleware } from "../middlewares/auth.js";
import { hasPermission } from "../middlewares/permission.js";
import { Profile } from "../../generated/prisma/enums.js";

const productRouter = Router();
const productController = new ProductController();

const ROLES = {
    CREATE: [Profile.ADMINISTRADOR, Profile.ESTOQUISTA],
    UPDATE: [Profile.ADMINISTRADOR, Profile.ESTOQUISTA],
    DELETE: [Profile.ADMINISTRADOR, Profile.ESTOQUISTA],
    VIEW: [Profile.ADMINISTRADOR, Profile.ESTOQUISTA, Profile.VENDEDOR]
};

productRouter.post('/api/products', authMiddleware, hasPermission(ROLES.CREATE), (req, res) => productController.create(req, res));
productRouter.get('/api/products', authMiddleware, hasPermission(ROLES.VIEW), (req, res) => productController.findAll(req, res));
productRouter.get('/api/products/:id', authMiddleware, hasPermission(ROLES.VIEW), (req, res) => productController.findById(req, res));
productRouter.put('/api/products/:id', authMiddleware, hasPermission(ROLES.UPDATE), (req, res) => productController.update(req, res));
productRouter.delete('/api/products/:id', authMiddleware, hasPermission(ROLES.DELETE), (req, res) => productController.deleteOne(req, res));

export { productRouter };