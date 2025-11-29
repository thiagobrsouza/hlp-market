
export interface User {
    id: string;
    name: string;
    username: string;
    role: 'ADMINISTRADOR' | 'VENDEDOR' | 'ESTOQUISTA';
}

export interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}