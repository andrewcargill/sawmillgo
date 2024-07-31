import React from 'react';
import { CardContent, Typography, Paper } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const stockLevelsData = [
  { name: 'Available', trees: 50, logs: 20, planks: 10 },
  { name: 'Reserved', trees: 20, logs: 10, planks: 5 },
];

const COLORS = ['#24211e', '#e4e5e0', '#e4e5e0'];

const StockLevelsWidget = () => {
  return (
    <Paper elevation={3} style={{ width: '100%', height: 150 }}>
      <CardContent>
        {/* <Typography variant="h6" gutterBottom>
          Stock Levels
        </Typography> */}
        <ResponsiveContainer width="100%" height={100}>
          <PieChart>
            <Pie data={stockLevelsData} dataKey="trees" nameKey="name" cx="50%" cy="50%" outerRadius={30} fill="#8884d8" label>
              {stockLevelsData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Paper>
  );
};

export default StockLevelsWidget;
