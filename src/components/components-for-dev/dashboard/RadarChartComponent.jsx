import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from 'recharts';

const sampleRadarData = [
  { subject: 'Quality', A: 120, B: 110, fullMark: 150 },
  { subject: 'Quantity', A: 98, B: 130, fullMark: 150 },
  { subject: 'Age', A: 86, B: 130, fullMark: 150 },
  { subject: 'Type', A: 99, B: 100, fullMark: 150 },
  { subject: 'Size', A: 85, B: 90, fullMark: 150 },
];

const RadarChartComponent = () => (
  <ResponsiveContainer width="100%" height={300}>
    <RadarChart data={sampleRadarData}>
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" />
      <PolarRadiusAxis angle={30} domain={[0, 150]} />
      <Radar name="Trees" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
      <Radar name="Logs" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
      <Legend />
    </RadarChart>
  </ResponsiveContainer>
);

export default RadarChartComponent;
