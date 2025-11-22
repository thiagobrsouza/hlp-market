import type { Invoice } from "../models/Invoice.js";
import { prisma } from "../resources/PrismaClient.js";

export class InvoiceService {

    async create({ description, invoiceNumber, invoiceDate, invoiceValue, supplierId }: Invoice) {
        const exists = await prisma.invoice.findUnique({
            where: { invoiceNumber }
        });
        if (exists) {
            throw new Error("Nota fiscal já cadastrada");
        }
        const dataIso = new Date(invoiceDate).toISOString();
        return prisma.invoice.create({
            data: { description, invoiceNumber, invoiceDate: dataIso, invoiceValue, supplierId }
        });
    }

    async findAll() {
        return prisma.invoice.findMany({
            include: { supplier: true }
        });
    }

    async findById(id: number) {
        return prisma.invoice.findUnique({
            where: { id },
            include: { supplier: true }
        });
    }

    async update(id: number, { description, invoiceNumber, invoiceDate, invoiceValue, supplierId }: Invoice) {
        const invoice = await prisma.invoice.findFirst({
            where: { id }
        });
        const exists = await prisma.invoice.findUnique({
            where: { invoiceNumber }
        });
        if (invoice && exists && invoice.id !== exists.id) {
            throw new Error("Nota fiscal já cadastrada");
        }
        const dataIso = new Date(invoiceDate).toISOString();
        return prisma.invoice.update({
            where: { id },
            data: { description, invoiceNumber, invoiceDate: dataIso, invoiceValue, supplierId }
        });
    }

    async deleteOne(id: number) {
        try {
            await prisma.invoice.delete({
                where: { id }
            });
        } catch {
            throw new Error("Nota fiscal não pode ser excluída");
        }
    }
}