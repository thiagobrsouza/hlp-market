import type { Request, Response } from "express";
import { BrandService } from "../services/BrandService.js";

const service = new BrandService();

export class BrandController {

    async create(req: Request, res: Response) {
        const brand = await service.create(req.body);
        return res.status(201).json(brand);
    }

    async findAll(req: Request, res: Response) {
        const brands = await service.findAll();
        return res.json(brands);
    }

    async findById(req: Request, res: Response) {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "ID is required" });
        }
        const brand = await service.findById(+id);
        return res.json(brand);
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "ID is required" });
        }
        const brand = await service.update(+id, req.body);
        return res.json(brand);
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