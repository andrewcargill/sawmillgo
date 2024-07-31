import React from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
} from '@mui/material';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
  LineChart, Line,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
} from 'recharts';

// Sample data
const treesData = [
  { name: 'Pine', age: '60-80', count: 30 },
  { name: 'Oak', age: '40-60', count: 20 },
  { name: 'Maple', age: '20-40', count: 10 },
];

const logsData = [
  { name: 'Pine', length: 400, diameter: 30, count: 20 },
  { name: 'Oak', length: 350, diameter: 35, count: 15 },
  { name: 'Maple', length: 300, diameter: 25, count: 10 },
];

const planksData = [
  { name: 'Construction', species: 'Pine', grade: '2', count: 40 },
  { name: 'Furniture', species: 'Oak', grade: '1', count: 20 },
  { name: 'Live-Edge', species: 'Maple', grade: '3', count: 10 },
];

const stockLevelsData = [
  { name: 'Available', trees: 50, logs: 20, planks: 10 },
  { name: 'Reserved', trees: 20, logs: 10, planks: 5 },
];

const projectStatusData = [
  { subject: 'Active', A: 3, fullMark: 5 },
  { subject: 'Paused', A: 2, fullMark: 5 },
  { subject: 'With Creator', A: 1, fullMark: 5 },
  { subject: 'Complete', A: 4, fullMark: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const DashboardWireFrame = () => (
  <Container maxWidth="lg">
    <Typography variant="h4" gutterBottom>
      Sawmill Management Dashboard
    </Typography>

    <Grid container spacing={3}>
      {/* Trees: Species and Ages */}
      <Grid item xs={12} md={6} lg={3}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Trees: Species and Ages
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={treesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>

      {/* Logs: Species, Length, and Diameter */}
      <Grid item xs={12} md={6} lg={3}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Logs: Species, Length, and Diameter
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
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
        </Card>
      </Grid>

      {/* Planks: Species, Grade, and Type */}
      <Grid item xs={12} md={6} lg={3}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Planks: Species, Grade, and Type
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={planksData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>

      {/* Stock Levels */}
      <Grid item xs={12} md={6} lg={3}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Stock Levels
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={stockLevelsData} dataKey="trees" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                  {stockLevelsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>

      {/* Project Status */}
      <Grid item xs={12} md={6} lg={3}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Project Status
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={projectStatusData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 5]} />
                <Radar name="Projects" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Container>
);

export default DashboardWireFrame;
