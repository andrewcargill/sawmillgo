import React from 'react';
import { CardContent, Typography, Paper, Grid } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const projectDeadlinesData = [
  { name: 'Project 1', deadline: '2024-06-01', daysLeft: 10 },
  { name: 'Project 2', deadline: '2024-06-15', daysLeft: 24 },
  { name: 'Project 3', deadline: '2024-07-01', daysLeft: 40 },
  { name: 'Project 4', deadline: '2024-07-20', daysLeft: 59 },
  { name: 'Project 5', deadline: '2024-08-01', daysLeft: 71 },
];

const formatXAxis = (tickItem) => {
  const date = new Date(tickItem);
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
};

const ProjectDeadlinesWidget = () => {
  return (
    <Grid container style={{ height: 150 }}>
      <CardContent style={{ width: '100%' }}>
        <Typography variant="body2" align='left ' gutterBottom>
          Deadlines
        </Typography>
        <ResponsiveContainer width="100%" height={100}>
          <LineChart data={projectDeadlinesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="deadline" tickFormatter={formatXAxis} />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="daysLeft" stroke="#24211e" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Grid>
  );
};

export default ProjectDeadlinesWidget;
