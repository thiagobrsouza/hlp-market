import { Router } from "express";
import { CategoryController } from "../controllers/CategoryController.js";
import { authMiddleware } from "../middlewares/auth.js";
import { hasPermission } from "../middlewares/permission.js";
import { Profile } from "../../generated/prisma/enums.js";

const categoryRouter = Router();
const categoryController = new CategoryController();

const ROLES = {
    CREATE: [Profile.ADMINISTRADOR, Profile.ESTOQUISTA],
    UPDATE: [Profile.ADMINISTRADOR, Profile.ESTOQUISTA],
    DELETE: [Profile.ADMINISTRADOR, Profile.ESTOQUISTA],
    VIEW: [Profile.ADMINISTRADOR, Profile.ESTOQUISTA, Profile.VENDEDOR]
};

categoryRouter.post('/api/categories', authMiddleware, hasPermission(ROLES.CREATE), (req, res) => categoryController.create(req, res));
categoryRouter.get('/api/categories', authMiddleware, hasPermission(ROLES.VIEW), (req, res) => categoryController.findAll(req, res));
categoryRouter.get('/api/categories/:id', authMiddleware, hasPermission(ROLES.VIEW), (req, res) => categoryController.findById(req, res));
categoryRouter.put('/api/categories/:id', authMiddleware, hasPermission(ROLES.UPDATE), (req, res) => categoryController.update(req, res));
categoryRouter.delete('/api/categories/:id', authMiddleware, hasPermission(ROLES.DELETE), (req, res) => categoryController.deleteOne(req, res));

export { categoryRouter };