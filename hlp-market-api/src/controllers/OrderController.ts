import type { Request, Response } from "express";
import { OrderService } from "../services/OrderService.js";

const service = new OrderService();

export class OrderController {

    async create(req: Request, res: Response) {
        const order = await service.create(req.body);
        return res.status(201).json(order);
    }

    async findAll(req: Request, res: Response) {
        const orders = await service.findAll();
        return res.json(orders);
    }

    async findById(req: Request, res: Response) {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "ID is required" });
        }
        const order = await service.findById(+id);
        return res.json(order);
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "ID is required" });
        }
        const order = await service.update(+id, req.body);
        return res.json(order);
    }

    async deleteOne(req: Request, res: Response) {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "ID is required" });
        }
        await service.deleteOne(+id);
        return res.status(204).send();
    }

    async deleteOrderItem(req: Request, res: Response) {
        const { id, itemId } = req.params;
        if (!id || !itemId) {
            return res.status(400).json({ message: "Order ID and Item ID are required" });
        }
        const order = await service.deleteOrderItem(+id, +itemId);
        return res.json(order);
    }
}