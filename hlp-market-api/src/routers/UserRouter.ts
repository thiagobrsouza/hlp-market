import { Router } from "express";
import { UserController } from "../controllers/UserController.js";

const userRouter = Router();
const userController = new UserController();

userRouter.post('/api/users', (req, res) => userController.create(req, res));
userRouter.get('/api/users', (req, res) => userController.findAll(req, res));
userRouter.get('/api/users/:id', (req, res) => userController.findById(req, res));
userRouter.put('/api/users/:id', (req, res) => userController.update(req, res));
userRouter.delete('/api/users/:id', (req, res) => userController.deleteOne(req, res));

export { userRouter };