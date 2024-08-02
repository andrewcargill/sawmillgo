import React from 'react';
import { CardContent, Typography, Paper, Grid } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const stockLevelsData = [
  { name: 'Available', trees: 50, logs: 20, planks: 10 },
  { name: 'Reserved', trees: 20, logs: 10, planks: 5 },
];

const COLORS = ['#24211e', '#5b5856'];

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  const totalTrees = stockLevelsData[index].trees;

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {totalTrees}
    </text>
  );
};

const StockLevelsWidget = () => {
  return (
    <Grid container style={{ height: 150 }}>
      <CardContent style={{ width: '100%' }}>
      <Typography variant="body2" align='left' gutterBottom>
          Overall Stock Levels
        </Typography>
        <ResponsiveContainer width="100%" height={100}>
          <PieChart>
            <Pie
              data={stockLevelsData}
              dataKey="trees"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={50}
              fill="#8884d8"
              labelLine={false}
              label={renderCustomizedLabel}
            >
              {stockLevelsData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Grid>
  );
};

export default StockLevelsWidget;
