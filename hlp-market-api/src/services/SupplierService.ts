import type { Supplier } from "../models/Supplier.js";
import { prisma } from "../resources/PrismaClient.js";

export class SupplierService {

    async create({ name, cnpj, notes }: Supplier) {
        const exists = await prisma.supplier.findUnique({
            where: { cnpj }
        });
        if (exists) {
            throw new Error("Fornecedor já cadastrado");
        }
        return prisma.supplier.create({
            data: { name, cnpj, notes }
        });
    }

    async findAll() {
        return prisma.supplier.findMany();
    }

    async findById(id: number) {
        return prisma.supplier.findUnique({
            where: { id }
        });
    }

    async update(id: number, { name, cnpj, notes }: Supplier) {
        const supplier = await prisma.supplier.findFirst({
            where: { id }
        });
        const exists = await prisma.supplier.findUnique({
            where: { cnpj }
        });
        if (supplier && exists && supplier.id !== exists.id) {
            throw new Error("Fornecedor já cadastrado");
        }
        return prisma.supplier.update({
            where: { id },
            data: { name, cnpj, notes }
        });
    }

    async deleteOne(id: number) {
        try {
            await prisma.supplier.delete({
                where: { id }
            });
        } catch {
            throw new Error("Fornecedor não pode ser removida");
        }
    }
}