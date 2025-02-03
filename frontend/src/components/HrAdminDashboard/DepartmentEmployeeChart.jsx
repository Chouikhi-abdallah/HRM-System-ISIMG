/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const DepartmentEmployeeChart = ({ hrAdminId }) => {
  const [data, setData] = useState([]);

  const COLORS = ['#ff6384', '#36a2eb', '#ffcd56', '#4caf50', '#ab47bc'];

  // Mapping department IDs to names
  const departmentNames = {
    1: 'Development',
    2: 'Testing',
    3: 'Operations',
    4: 'Security',
  };

  useEffect(() => {
    const fetchDepartmentData = async () => {
      try {
        const departmentIds = [1, 2, 3, 4]; // IDs for departments
        const promises = departmentIds.map(id => 
          axios.get(`http://localhost:5000/api/employees/bydepartment/${id}`)
        );

        const results = await Promise.all(promises);

        // Aggregate results into a format suitable for the PieChart
        const aggregatedData = results.map((response, index) => ({
          name: departmentNames[departmentIds[index]], // Get department name from mapping
          value: response.data.length, // Count of employees in that department
        }));

        setData(aggregatedData);
      } catch (error) {
        console.error('Error fetching department employee data:', error);
      }
    };

    fetchDepartmentData();
  }, [hrAdminId]);

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
