import { hash } from "bcrypt";
import type { User } from "../models/User";
import { prisma } from "../resources/PrismaClient";

export class UserService {

    async create({ name, username, password, confirmPassword, profile }: User) {
        const exists = await prisma.user.findUnique({
            where: { username }
        });
        if (exists) {
            throw new Error("Usuário já cadastrado");
        }
        if (password !== confirmPassword) {
            throw new Error("As senhas não conferem");
        }
        const hashPassword = await hash(password, 10);

        return prisma.user.create({
            data: { name, username, password: hashPassword, profile },
            select: {
                id: true,
                name: true,
                username: true,
                profile: true
            }
        });
    }

    async findAll() {
        return prisma.user.findMany({
            select: {
                id: true,
                name: true,
                username: true,
                profile: true
            }
        });
    }

    async findById(id: number) {
        return prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                username: true,
                profile: true
            }
        });
    }

    async update(id: number, { name, username, profile }: User) {
        const user = await prisma.user.findUnique({
            where: { id }
        });
        const exists = await prisma.user.findUnique({
            where: { username }
        });
        if (exists && exists.id !== user?.id) {
            throw new Error("Usuário já cadastrado");
        }
        return prisma.user.update({
            where: { id },
            data: { name, username, profile },
            select: {
                id: true,
                name: true,
                username: true,
                profile: true
            }
        });
    }

    async updatePassword(id: number, password: string, confirmPassword: string) {
        if (password !== confirmPassword) {
            throw new Error("As senhas não conferem");
        }
        const hashPassword = await hash(password, 10);
        return prisma.user.update({
            where: { id },
            data: { password: hashPassword },
            select: {
                id: true,
                name: true,
                username: true,
                profile: true
            }
        });
    }

    async deleteOne(id: number) {
        try {
            await prisma.user.delete({
                where: { id }
            });
        } catch {
            throw new Error("Usuário não pode ser removido");
        }
    }
}