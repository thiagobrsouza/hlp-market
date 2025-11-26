import { Router } from "express";
import { UserController } from "../controllers/UserController.js";
import { authMiddleware } from "../middlewares/auth.js";
import { hasPermission } from "../middlewares/permission.js";
import { Profile } from "../../generated/prisma/enums.js";

const userRouter = Router();
const userController = new UserController();

userRouter.post('/api/users', (req, res) => userController.create(req, res));
userRouter.get('/api/users', authMiddleware, hasPermission([Profile.ADMINISTRADOR]), (req, res) => userController.findAll(req, res));
userRouter.get('/api/users/:id', authMiddleware, hasPermission([Profile.ADMINISTRADOR]), (req, res) => userController.findById(req, res));
userRouter.put('/api/users/:id', authMiddleware, hasPermission([Profile.ADMINISTRADOR]), (req, res) => userController.update(req, res));
userRouter.put('/api/users/:id/password', authMiddleware, hasPermission([Profile.ADMINISTRADOR]), (req, res) => userController.updatePassword(req, res));
userRouter.delete('/api/users/:id', authMiddleware, hasPermission([Profile.ADMINISTRADOR]), (req, res) => userController.deleteOne(req, res));

export { userRouter };