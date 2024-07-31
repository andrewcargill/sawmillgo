import React from 'react';
import { CardContent, Typography, Paper, Grid } from '@mui/material';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip, ResponsiveContainer } from 'recharts';

const projectStatusData = [
  { subject: 'Active', A: 3, fullMark: 5 },
  { subject: 'Paused', A: 2, fullMark: 5 },
  { subject: 'With Creator', A: 1, fullMark: 5 },
  { subject: 'Complete', A: 4, fullMark: 5 },
];

const ProjectStatusWidget = () => {
  return (
    <Grid container style={{ height: 150 }}>
      <CardContent style={{ width: '100%' }}>
        {/* <Typography variant="h6" gutterBottom>
          Project Status
        </Typography> */}
        <ResponsiveContainer width="100%" height={'100%'}>
          <RadarChart data={projectStatusData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 5]} />
            <Radar name="Projects" dataKey="A" stroke="#24211e" fill="#24211e" fillOpacity={0.6} />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Grid>
  );
};

export default ProjectStatusWidget;
