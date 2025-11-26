import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../resources/PrismaClient";
import type { User } from "../models/User";

// It's recommended to use an environment variable for the JWT secret
const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-key";

export class AuthService {

    async login({ username, password }: Pick<User, "username" | "password">) {
        const user = await prisma.user.findUnique({
            where: { username }
        });

        if (!user) {
            throw new Error("Usuário ou senha inválidos");
        }

        const isPasswordValid = await compare(password, user.password);

        if (!isPasswordValid) {
            throw new Error("Usuário ou senha inválidos");
        }

        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                profile: user.profile
            },
            JWT_SECRET,
            { expiresIn: "1d" }
        );

        return {
            user: {
                id: user.id,
                name: user.name,
                username: user.username,
                profile: user.profile
            },
            token
        };
    }
}
