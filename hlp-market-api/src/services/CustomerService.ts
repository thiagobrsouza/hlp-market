import type { Customer } from "../models/Customer.js";
import { prisma } from "../resources/PrismaClient.js";

export class CustomerService {

    async create({ name, cpf, notes }: Customer) {
        const exists = await prisma.customer.findUnique({
            where: { cpf }
        });
        if (exists) {
            throw new Error("Cliente já cadastrado");
        }
        return prisma.customer.create({
            data: { name, cpf, notes }
        });
    }

    async findAll() {
        return prisma.customer.findMany();
    }

    async findById(id: number) {
        return prisma.customer.findUnique({
            where: { id }
        });
    }

    async update(id: number, { name, cpf, notes }: Customer) {
        const customer = await prisma.customer.findFirst({
            where: { id }
        });
        const exists = await prisma.customer.findUnique({
            where: { cpf }
        });
        if (customer && exists && customer.id !== exists.id) {
            throw new Error("Cliente já cadastrado");
        }
        return prisma.customer.update({
            where: { id },
            data: { name }
        });
    }

    async deleteOne(id: number) {
        try {
            await prisma.customer.delete({
                where: { id }
            });
        } catch {
            throw new Error("Cliente não pode ser removido");
        }
    }
}