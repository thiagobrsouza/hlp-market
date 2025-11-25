import type { Request, Response } from "express";
import { UserService } from "../services/UserService.js";

const service = new UserService();

export class UserController {

    async create(req: Request, res: Response) {
        const user = await service.create(req.body);
        return res.status(201).json(user);
    }

    async findAll(req: Request, res: Response) {
        const users = await service.findAll();
        return res.json(users);
    }

    async findById(req: Request, res: Response) {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "ID is required" });
        }
        const user = await service.findById(+id);
        return res.json(user);
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "ID is required" });
        }
        const user = await service.update(+id, req.body);
        return res.json(user);
    }

    async updatePassword(req: Request, res: Response) {
        const { id } = req.params;
        const { password, confirmPassword } = req.body;
        if (!id) {
            return res.status(400).json({ message: "ID is required" });
        }
        const user = await service.updatePassword(+id, password, confirmPassword);
        return res.json(user);
    }

    async deleteOne(req: Request, res: Response) {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "ID is required" });
        }
        await service.deleteOne(+id);
        return res.status(204).send();
    }

}