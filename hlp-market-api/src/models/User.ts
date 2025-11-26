import type { Profile } from "../../generated/prisma/index.js";

export interface User {
    name: string;
    username: string;
    password: string;
    confirmPassword: string;
    profile: Profile;
}