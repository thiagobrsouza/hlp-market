'use client';

import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/layout/Navbar';
import { Container, Box } from '@mui/material';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
        return <div>Redirecionando para o login...</div>; // Ou um spinner
    }

    return (
        <Box>
            <Navbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                {children}
            </Container>
        </Box>
    );
};

export default DashboardLayout;