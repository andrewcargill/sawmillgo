import React from 'react';
import { CardContent, Typography, Paper } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const planksData = [
  { name: 'Construction', species: 'Pine', grade: '2', count: 40 },
  { name: 'Furniture', species: 'Oak', grade: '1', count: 20 },
  { name: 'Live-Edge', species: 'Maple', grade: '3', count: 10 },
];

const PlanksWidget = () => {
  return (
    <Paper elevation={3} style={{ width: '100%', height: 150 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Planks: 
        </Typography>
        <ResponsiveContainer width="100%" height={100}>
          <BarChart data={planksData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#24211e" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Paper>
  );
};

export default PlanksWidget;
