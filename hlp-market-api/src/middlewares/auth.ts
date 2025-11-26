import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Profile } from "../../generated/prisma/enums.js";

// It's recommended to use an environment variable for the JWT secret
const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-key";

interface TokenPayload {
    id: number;
    username: string;
    profile: Profile;
    iat: number;
    exp: number;
}

export function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    const [, token] = authorization.split(' ');

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const { id, username, profile } = decoded as TokenPayload;

        req.user = { id, username, profile };

        return next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido' });
    }
}
