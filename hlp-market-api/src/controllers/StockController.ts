import type { Request, Response } from "express";
import { StockService } from "../services/StockService.js";

const service = new StockService();

export class StockController {

    async create(req: Request, res: Response) {
        const stockItem = await service.create(req.body);
        return res.status(201).json(stockItem);
    }

    async findAll(req: Request, res: Response) {
        const stockItems = await service.findAll();
        return res.json(stockItems);
    }

    async findById(req: Request, res: Response) {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "ID is required" });
        }
        const stockItem = await service.findById(+id);
        return res.json(stockItem);
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "ID is required" });
        }
        const stockItem = await service.update(+id, req.body);
        return res.json(stockItem);
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