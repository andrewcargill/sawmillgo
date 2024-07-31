import React from 'react';
import { CardContent, Typography, Paper } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const treesData = [
  { name: 'Pine', age: '60-80', count: 30 },
  { name: 'Oak', age: '40-60', count: 20 },
  { name: 'Maple', age: '20-40', count: 10 },
];

const TreesWidget = () => {
  return (
    <Paper elevation={3} style={{ width: '100%', height: 150 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Trees
        </Typography>
        <ResponsiveContainer width="100%" height={100}>
          <BarChart data={treesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Paper>
  );
};

export default TreesWidget;
