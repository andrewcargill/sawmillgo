import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const sampleAreaData = [
  { name: 'January', trees: 30, logs: 20, planks: 40 },
  { name: 'February', trees: 40, logs: 25, planks: 50 },
  { name: 'March', trees: 35, logs: 30, planks: 45 },
  { name: 'April', trees: 50, logs: 40, planks: 60 },
];

const AreaChartComponent = () => (
  <ResponsiveContainer width="100%" height={300}>
    <AreaChart data={sampleAreaData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Area type="monotone" dataKey="trees" stackId="1" stroke="#8884d8" fill="#8884d8" />
      <Area type="monotone" dataKey="logs" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
      <Area type="monotone" dataKey="planks" stackId="1" stroke="#ffc658" fill="#ffc658" />
    </AreaChart>
  </ResponsiveContainer>
);

export default AreaChartComponent;
