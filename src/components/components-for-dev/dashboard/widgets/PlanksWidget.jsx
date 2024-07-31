import React from 'react';
import { CardContent, Typography, Paper, Grid } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const planksData = [
  { name: 'Verified', species: 'Pine', grade: '2', count: 40 },
  { name: 'Standard', species: 'Oak', grade: '1', count: 20 },

];

const PlanksWidget = () => {
  return (
    <Grid container style={{ height: 150 }}>
      <CardContent style={{ width: '80%' }}>
        <Typography variant="h6" gutterBottom>
          Planks
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
     
    </Grid>
  );
};

export default PlanksWidget;
