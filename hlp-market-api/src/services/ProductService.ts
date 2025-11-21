import type { Product } from "../models/Product.js";
import { prisma } from "../resources/PrismaClient.js";

export class ProductService {

    async create({ name, brandId, categoryId, unitMeasure }: Product) {
        const exists = await prisma.product.findUnique({
            where: { name }
        });
        if (exists) {
            throw new Error("Produto já cadastrado");
        }
        return prisma.product.create({
            data: { name, unitMeasure, brandId, categoryId }
        });
    }

    async findAll() {
        return prisma.product.findMany({
            include: { brand: true, category: true }
        });
    }

    async findById(id: number) {
        return prisma.product.findUnique({
            where: { id },
            include: { brand: true, category: true }
        });
    }

    async update(id: number, { name, brandId, categoryId, unitMeasure }: Product) {
        const product = await prisma.product.findFirst({
            where: { id }
        });
        const exists = await prisma.product.findUnique({
            where: { name }
        });
        if (product && exists && product.id !== exists.id) {
            throw new Error("Produto já cadastrado");
        }
        return prisma.product.update({
            where: { id },
            data: { name, brandId, categoryId, unitMeasure }
        });
    }

    async deleteOne(id: number) {
        try {
            await prisma.product.delete({
                where: { id }
            });
        } catch {
            throw new Error("Produto não pode ser removida");
        }
    }
}