import type { Request, Response, NextFunction } from 'express';
import { Profile } from '../../generated/prisma/enums.js';

export function checkUserPermission() {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.user;
        const { id } = req.params;

        if (!user) {
            return res.status(401).json({ message: 'Não autorizado' });
        }

        if (user.profile === Profile.ADMINISTRADOR) {
            return next();
        }

        if (user.id === Number(id)) {
            return next();
        }

        return res.status(403).json({ message: 'Acesso negado' });
    };
}
