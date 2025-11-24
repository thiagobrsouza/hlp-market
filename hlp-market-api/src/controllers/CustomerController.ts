import type { Request, Response } from "express";
import { CustomerService } from "../services/CustomerService.js";

const service = new CustomerService();

export class CustomerController {

    async create(req: Request, res: Response) {
        const customer = await service.create(req.body);
        return res.status(201).json(customer);
    }

    async findAll(req: Request, res: Response) {
        const customers = await service.findAll();
        return res.json(customers);
    }

    async findById(req: Request, res: Response) {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "ID is required" });
        }
        const customer = await service.findById(+id);
        return res.json(customer);
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "ID is required" });
        }
        const customer = await service.update(+id, req.body);
        return res.json(customer);
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