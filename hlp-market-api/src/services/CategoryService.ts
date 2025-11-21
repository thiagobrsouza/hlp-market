import type { Category } from "../models/Category.js";
import { prisma } from "../resources/PrismaClient.js";

export class CategoryService {

    async create({ name }: Category) {
        const exists = await prisma.category.findUnique({
            where: { name }
        });
        if (exists) {
            throw new Error("Categoria já cadastrada");
        }
        return prisma.category.create({
            data: { name }
        });
    }

    async findAll() {
        return prisma.category.findMany();
    }

    async findById(id: number) {
        return prisma.category.findUnique({
            where: { id }
        });
    }

    async update(id: number, { name }: Category) {
        const category = await prisma.category.findFirst({
            where: { id }
        });
        const exists = await prisma.category.findUnique({
            where: { name }
        });
        if (category && exists && category.id !== exists.id) {
            throw new Error("Categoria já cadastrada");
        }
        return prisma.category.update({
            where: { id },
            data: { name }
        });
    }

    async deleteOne(id: number) {
        try {
            await prisma.category.delete({
                where: { id }
            });
        } catch {
            throw new Error("Categoria não pode ser removida");
        }
    }
}