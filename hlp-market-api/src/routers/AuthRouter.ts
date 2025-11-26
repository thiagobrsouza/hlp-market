import { Router } from "express";
import { AuthController } from "../controllers/AuthController.js";

const authRouter = Router();
const authController = new AuthController();

authRouter.post('/api/login', (req, res) => authController.login(req, res));

export { authRouter };
