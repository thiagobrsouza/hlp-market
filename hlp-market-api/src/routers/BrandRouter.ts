import { Router } from "express";
import { BrandController } from "../controllers/BrandController.js";
import { authMiddleware } from "../middlewares/auth.js";
import { hasPermission } from "../middlewares/permission.js";
import { Profile } from "../../generated/prisma/enums.js";

const brandRouter = Router();
const brandController = new BrandController();

const ROLES = {
    CREATE: [Profile.ADMINISTRADOR, Profile.ESTOQUISTA],
    UPDATE: [Profile.ADMINISTRADOR, Profile.ESTOQUISTA],
    DELETE: [Profile.ADMINISTRADOR, Profile.ESTOQUISTA],
    VIEW: [Profile.ADMINISTRADOR, Profile.ESTOQUISTA, Profile.VENDEDOR]
};

brandRouter.post('/api/brands', authMiddleware, hasPermission(ROLES.CREATE), (req, res) => brandController.create(req, res));
brandRouter.get('/api/brands', authMiddleware, hasPermission(ROLES.VIEW), (req, res) => brandController.findAll(req, res));
brandRouter.get('/api/brands/:id', authMiddleware, hasPermission(ROLES.VIEW), (req, res) => brandController.findById(req, res));
brandRouter.put('/api/brands/:id', authMiddleware, hasPermission(ROLES.UPDATE), (req, res) => brandController.update(req, res));
brandRouter.delete('/api/brands/:id', authMiddleware, hasPermission(ROLES.DELETE), (req, res) => brandController.deleteOne(req, res));

export { brandRouter };