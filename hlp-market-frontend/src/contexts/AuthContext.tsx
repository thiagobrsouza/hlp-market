'use client';

import { createContext, useState, useEffect, ReactNode } from 'react';
import { api, setAuthToken } from '../api/api';
import { AuthContextType, User } from '../interfaces';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setToken(storedToken);
            setUser(parsedUser);
            setAuthToken(storedToken);
        }
        setLoading(false);
    }, []);

    const login = async (username: string, password: string) => {
        const { data } = await api.post('/login', { username, password });
        const { user, token } = data;

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        setUser(user);
        setToken(token);
        setAuthToken(token);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setToken(null);
        setAuthToken(null);
    };

    const isAuthenticated = !!token;

    if (loading) {
        return <div>Carregando...</div>; // Ou um componente de spinner
    }

    return (
        <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;