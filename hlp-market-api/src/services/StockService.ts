import type { StockItem } from "../models/StockItem";
import { prisma } from "../resources/PrismaClient.js";

export class StockService {
    async create({ productId, invoiceId, quantity, unitPrice }: StockItem) {
        const totalValueCalculated = quantity * unitPrice;
        return prisma.stockItem.create({
            data: { productId, invoiceId, quantity, unitPrice, totalValue: totalValueCalculated },
            include: { product: true, invoice: true }
        });
    }

    async findAll() {
        return prisma.stockItem.findMany({
            include: { product: true, invoice: true }
        });
    }

    async findById(id: number) {
        return prisma.stockItem.findUnique({
            where: { id },
            include: { product: true, invoice: true }
        });
    }

    async update(id: number, { productId, invoiceId, quantity, unitPrice }: StockItem) {
        const totalValueCalculated = quantity * unitPrice;
        return prisma.stockItem.update({
            where: { id },
            data: { productId, invoiceId, quantity, unitPrice, totalValue: totalValueCalculated },
            include: { product: true, invoice: true }
        });
    }

    async deleteOne(id: number) {
        try {
            await prisma.stockItem.delete({
                where: { id }
            });
        } catch {
            throw new Error("Item do estoque não pode ser removido");
        }
    }
}