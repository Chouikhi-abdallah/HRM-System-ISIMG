/* eslint-disable react/prop-types */
// src/components/Dashboard/DepartmentEmployeeChart.jsx
import  { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DepartmentEmployeeChart = ({ hrAdminId }) => {
  const [data, setData] = useState([]);

  const COLORS = ['#ff6384', '#36a2eb', '#ffcd56', '#4caf50', '#ab47bc'];

  useEffect(() => {
    const fetchDepartmentData = async () => {
      try {
        // Replace with actual API call
        const departmentData = await fetchDepartmentEmployees();
        setData(departmentData);
      } catch (error) {
        console.error('Error fetching department employee data:', error);
      }
    };

    fetchDepartmentData();
  }, [hrAdminId]);

  // Mock data
  const fetchDepartmentEmployees = async () => {
    return [
      { name: 'HR', value: 15 },
      { name: 'Engineering', value: 50 },
      { name: 'Sales', value: 30 },
      { name: 'Marketing', value: 25 },
      { name: 'Support', value: 20 },
    ];
  };

  return (
    <Card className="shadow-lg">
      <CardContent>
        <Typography variant="h6" className="font-semibold mb-4">
          Employee Distribution by Department
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
              outerRadius={100}
              fill="#82ca9d"
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

export default DepartmentEmployeeChart;
