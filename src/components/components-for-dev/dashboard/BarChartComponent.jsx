import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const sampleBarData = [
  { name: 'Trees', count: 30 },
  { name: 'Logs', count: 20 },
  { name: 'Planks', count: 40 },
];

const BarChartComponent = () => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={sampleBarData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="count" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

export default BarChartComponent;
