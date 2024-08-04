import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
function TaskPage() {
    const location = useLocation();
    const { taskId } = useParams();
    const { description } = location.state || {};

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'start',
                marginTop: '3rem',
                minHeight: '100vh', // Full height of the viewport
            }}
        >
            <Card variant="outlined" sx={{ maxWidth: 800 }}>
                <Box sx={{ p: 2 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography gutterBottom variant="h5" component="div">
                            Task with id = {taskId}
                        </Typography>
                    </Stack>
                    {description && <Typography color="text.secondary" variant="body2">
                        Description: {description}
                    </Typography>}
                </Box>
                <Divider />
            </Card>
        </Box>
    );
}

export default TaskPage;