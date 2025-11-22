import type { Request, Response } from "express";
import { InvoiceService } from "../services/InvoiceService.js";

const service = new InvoiceService();

export class InvoiceController {

    async create(req: Request, res: Response) {
        const invoice = await service.create(req.body);
        return res.status(201).json(invoice);
    }

    async findAll(req: Request, res: Response) {
        const invoices = await service.findAll();
        return res.json(invoices);
    }

    async findById(req: Request, res: Response) {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "ID is required" });
        }
        const invoice = await service.findById(+id);
        return res.json(invoice);
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "ID is required" });
        }
        const invoice = await service.update(+id, req.body);
        return res.json(invoice);
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