import { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const DonutChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const visitors = await fetchVisitors();
        const sexDistribution = getSexDistribution(visitors);
        setData(sexDistribution);
      } catch (error) {
        console.error('Error fetching visitors:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchVisitors = async () => {
    const response = await axios.get('http://localhost:5000/api/visitors/all');
    return response.data;
  };

  const getSexDistribution = (visitors) => {
    const maleCount = visitors.filter(visitor => visitor.sex === 'MALE').length;
    const femaleCount = visitors.filter(visitor => visitor.sex === 'FEMALE').length;
    const total = maleCount + femaleCount;

    return [
      { name: 'Male', value: maleCount, percentage: ((maleCount / total) * 100).toFixed(2) },
      { name: 'Female', value: femaleCount, percentage: ((femaleCount / total) * 100).toFixed(2) }
    ];
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Card className="shadow-lg">
      <CardContent>
        <Typography variant="h6" className="font-semibold mb-4">
          Employee Distribution by Sex
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#0088FE' : '#FFBB28'} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        {/* Labels below the donut chart */}
        <Box display="flex" justifyContent="center" marginTop={2}>
          {data.map((entry, index) => (
            <Box key={entry.name} display="flex" alignItems="center" marginX={1}>
              <Box 
                width={16} 
                height={16} 
                bgcolor={index % 2 === 0 ? '#0088FE' : '#FFBB28'} 
                borderRadius="50%" 
                marginRight={1}
              />
              <Typography>
                {entry.name} {entry.percentage}%
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default DonutChart;
