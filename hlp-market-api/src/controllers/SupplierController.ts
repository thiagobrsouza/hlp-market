import type { Request, Response } from "express";
import { SupplierService } from "../services/SupplierService.js";

const service = new SupplierService();

export class SupplierController {

    async create(req: Request, res: Response) {
        const supplier = await service.create(req.body);
        return res.status(201).json(supplier);
    }

    async findAll(req: Request, res: Response) {
        const suppliers = await service.findAll();
        return res.json(suppliers);
    }

    async findById(req: Request, res: Response) {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "ID is required" });
        }
        const supplier = await service.findById(+id);
        return res.json(supplier);
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "ID is required" });
        }
        const supplier = await service.update(+id, req.body);
        return res.json(supplier);
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