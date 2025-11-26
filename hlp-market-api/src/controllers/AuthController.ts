import type { Request, Response } from "express";
import { AuthService } from "../services/AuthService.js";

const authService = new AuthService();

export class AuthController {
    async login(req: Request, res: Response) {
        const { username, password } = req.body;
        const result = await authService.login({ username, password });
        return res.json(result);
    }
}
