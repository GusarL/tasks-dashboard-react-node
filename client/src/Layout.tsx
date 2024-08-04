import { Card, CardContent, Typography } from '@mui/material'
import {FormicTable} from './FormicTable.tsx';
import React from 'react';

export const Layout: React.FC = () => {
    return (
        <Card sx={{ minWidth: 175 }}>
            <CardContent>
                <Typography sx={{ fontSize: 18, fontWeight: 'bold' }} color="text.secondary" gutterBottom>
                    Task dashboard
                </Typography>
                <FormicTable />
            </CardContent>
        </Card>
    );
}