import type { Request, Response, NextFunction } from 'express';
import { Profile } from "../../generated/prisma/enums.js";

export function hasPermission(allowedProfiles: Profile[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.user;

        if (!user) {
            return res.status(401).json({ message: 'Não autorizado' });
        }

        if (!allowedProfiles.includes(user.profile)) {
            return res.status(403).json({ message: 'Acesso negado' });
        }

        return next();
    };
}


