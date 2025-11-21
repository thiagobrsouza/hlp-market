import type { Request, Response } from "express";
import { ProductService } from "../services/ProductService.js";

const service = new ProductService();

export class ProductController {

    async create(req: Request, res: Response) {
        const product = await service.create(req.body);
        return res.status(201).json(product);
    }

    async findAll(req: Request, res: Response) {
        const products = await service.findAll();
        return res.json(products);
    }

    async findById(req: Request, res: Response) {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "ID is required" });
        }
        const product = await service.findById(+id);
        return res.json(product);
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "ID is required" });
        }
        const product = await service.update(+id, req.body);
        return res.json(product);
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