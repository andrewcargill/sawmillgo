import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const sampleComposedData = [
  { name: 'January', trees: 30, logs: 20, planks: 40 },
  { name: 'February', trees: 40, logs: 25, planks: 50 },
  { name: 'March', trees: 35, logs: 30, planks: 45 },
  { name: 'April', trees: 50, logs: 40, planks: 60 },
];

const ComposedChartComponent = () => (
  <ResponsiveContainer width="100%" height={300}>
    <ComposedChart data={sampleComposedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid stroke="#f5f5f5" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="trees" barSize={20} fill="#413ea0" />
      <Line type="monotone" dataKey="logs" stroke="#ff7300" />
      <Line type="monotone" dataKey="planks" stroke="#387908" />
    </ComposedChart>
  </ResponsiveContainer>
);

export default ComposedChartComponent;
