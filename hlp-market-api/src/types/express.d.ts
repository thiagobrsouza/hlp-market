import { Profile } from '../../generated/prisma/index.js';

declare global {
    namespace Express {
        export interface Request {
            user?: {
                id: number;
                username: string;
                profile: Profile;
            }
        }
    }
}
