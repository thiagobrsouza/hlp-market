import type { Profile } from "../../generated/prisma/enums";

export interface User {
    name: string;
    username: string;
    password: string;
    confirmPassword: string;
    profile: Profile;
}