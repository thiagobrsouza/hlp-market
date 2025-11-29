'use client';

import { Card, CardContent, Typography, Box } from '@mui/material';
import { ReactNode } from 'react';

interface StyledCardProps {
    title: string;
    children: ReactNode;
}

const StyledCard = ({ title, children }: StyledCardProps) => {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
            <Card sx={{ minWidth: 275, maxWidth: 800, textAlign: 'center', border: '1px solid #e0e0e0' }}>
                <CardContent>
                    <Typography variant="h5" component="div" sx={{ mb: 2 }}>
                        {title}
                    </Typography>
                    {children}
                </CardContent>
            </Card>
        </Box>
    );
};

export default StyledCard;