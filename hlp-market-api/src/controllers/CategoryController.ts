import type { Request, Response } from "express";
import { CategoryService } from "../services/CategoryService.js";

const service = new CategoryService();

export class CategoryController {

    async create(req: Request, res: Response) {
        const category = await service.create(req.body);
        return res.status(201).json(category);
    }

    async findAll(req: Request, res: Response) {
        const categorys = await service.findAll();
        return res.json(categorys);
    }

    async findById(req: Request, res: Response) {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "ID is required" });
        }
        const category = await service.findById(+id);
        return res.json(category);
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "ID is required" });
        }
        const category = await service.update(+id, req.body);
        return res.json(category);
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