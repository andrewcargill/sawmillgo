import React from 'react';
import { Container, Typography, Box, Button, Grid, Card, CardContent } from '@mui/material';

const RoadmapSection = () => {
    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            <Box textAlign="center" mb={6}>
                <Typography variant="h3" component="h1" gutterBottom>
                    Roadmap & Next Steps
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Our vision for SawmillGo's development and launch.
                </Typography>
            </Box>
            
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Card elevation={3} sx={{ borderRadius: 2 }}>
                        <CardContent>
                            <Typography variant="h5" gutterBottom>
                                Current Progress
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                ✅ MVP Completed – SawmillGo’s core software is developed and ready for investment and testing.<br/>
                                ✅ Video Demonstrations – A series of videos showcasing SawmillGo’s features are available.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card elevation={3} sx={{ borderRadius: 2 }}>
                        <CardContent>
                            <Typography variant="h5" gutterBottom>
                                2025 Key Milestones
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                🔹 Q1 2025 – Finalize MVP testing with user feedback.<br/>
                                🔹 Q2 2025 – Implement new features based on market and user needs.<br/>
                                🔹 Q3 2025 – Launch pilot program with select sawmills and creators.<br/>
                                🔹 Q4 2025 – Refine software and prepare for broader rollout.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            
           
        </Container>
    );
};

export default RoadmapSection;
