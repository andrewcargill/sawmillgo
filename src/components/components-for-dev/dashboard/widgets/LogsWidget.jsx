import React from 'react';
import { CardContent, Typography, Paper } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const logsData = [
  { name: 'Pine', length: 400, diameter: 30, count: 20 },
  { name: 'Oak', length: 350, diameter: 35, count: 15 },
  { name: 'Maple', length: 300, diameter: 25, count: 10 },
];

const LogsWidget = () => {
  return (
    <Paper elevation={3} style={{ width: '100%', height: 150 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Logs: 
        </Typography>
        <ResponsiveContainer width="100%" height={100}>
          <BarChart data={logsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="length" fill="#8884d8" />
            <Bar dataKey="diameter" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Paper>
  );
};

export default LogsWidget;
