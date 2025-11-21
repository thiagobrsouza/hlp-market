import type { Brand } from "../models/Brand.js";
import { prisma } from "../resources/PrismaClient.js";

export class BrandService {

    async create({ name }: Brand) {
        const exists = await prisma.brand.findUnique({
            where: { name }
        });
        if (exists) {
            throw new Error("Marca já cadastrada");
        }
        return prisma.brand.create({
            data: { name }
        });
    }

    async findAll() {
        return prisma.brand.findMany();
    }

    async findById(id: number) {
        return prisma.brand.findUnique({
            where: { id }
        });
    }

    async update(id: number, { name }: Brand) {
        const brand = await prisma.brand.findFirst({
            where: { id }
        });
        const exists = await prisma.brand.findUnique({
            where: { name }
        });
        if (brand && exists && brand.id !== exists.id) {
            throw new Error("Marca já cadastrada");
        }
        return prisma.brand.update({
            where: { id },
            data: { name }
        });
    }

    async deleteOne(id: number) {
        try {
            await prisma.brand.delete({
                where: { id }
            });
        } catch {
            throw new Error("Marca não pode ser removida");
        }
    }
}