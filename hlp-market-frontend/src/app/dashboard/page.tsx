'use client';

import { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, CircularProgress, Paper } from '@mui/material';
import { api } from '@/api/api';
import { formatCurrency } from '@/utils/formatCurrency';
import StyledCard from '@/components/ui/StyledCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DashboardData {
    monthlySales: number;
    stockValue: number;
    topProducts: {
        id: number;
        name: string;
        quantity: number;
    }[];
}

const DashboardPage = () => {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/dashboard');
                setData(response.data);
            } catch (err) {
                setError('Erro ao carregar os dados do dashboard');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <StyledCard title="Vendas no Mês">
                    <Typography variant="h4">
                        {formatCurrency(data?.monthlySales || 0)}
                    </Typography>
                </StyledCard>
            </Grid>
            <Grid item xs={12} md={6}>
                <StyledCard title="Valor Total em Estoque">
                    <Typography variant="h4">
                        {formatCurrency(data?.stockValue || 0)}
                    </Typography>
                </StyledCard>
            </Grid>
            <Grid item xs={12}>
                <StyledCard title="Top 5 Produtos Mais Vendidos no Mês">
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={data?.topProducts}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="quantity" fill="#8884d8" name="Quantidade Vendida" />
                        </BarChart>
                    </ResponsiveContainer>
                </StyledCard>
            </Grid>
        </Grid>
    );
};

export default DashboardPage;