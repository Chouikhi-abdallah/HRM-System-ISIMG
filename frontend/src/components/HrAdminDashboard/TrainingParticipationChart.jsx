/* eslint-disable react/prop-types */
// src/components/Dashboard/TrainingParticipationChart.jsx
import  { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TrainingParticipationChart = ({ hrAdminId }) => {
  const [data, setData] = useState([]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#af52bf'];

  useEffect(() => {
    const fetchTrainingData = async () => {
      try {
        // Replace with actual API call
        const trainingData = await fetchTrainingParticipation();
        setData(trainingData);
      } catch (error) {
        console.error('Error fetching training data:', error);
      }
    };

    fetchTrainingData();
  }, [hrAdminId]);

  // Mock data
  const fetchTrainingParticipation = async () => {
    return [
      { name: 'Leadership', value: 40 },
      { name: 'Technical Skills', value: 30 },
      { name: 'Communication', value: 20 },
      { name: 'Time Management', value: 10 },
    ];
  };

  return (
    <Card className="shadow-lg">
      <CardContent>
        <Typography variant="h6" className="font-semibold mb-4">
          Training Participation Rates
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default TrainingParticipationChart;
