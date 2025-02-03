/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import CodeIcon from '@mui/icons-material/Code';
import TestIcon from '@mui/icons-material/BugReport';  // Example icon for test
import OperationsIcon from '@mui/icons-material/Build'; // Example icon for operations
import SecurityIcon from '@mui/icons-material/Security'; // Example icon for security

// Custom X-axis tick component to render icons instead of text
const CustomTick = ({ x, y, payload }) => {
  const iconMap = {
    development: <CodeIcon />,
    test: <TestIcon />,
    operation: <OperationsIcon />,
    security: <SecurityIcon />,
  };

  return (
    <g transform={`translate(${x},${y})`}>
      <foreignObject x="-15" y="0" width="30" height="30">
        {iconMap[payload.value] || null}
      </foreignObject>
    </g>
  );
};

const PayrollChart = ({ hrAdminId }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchPayrollData = async () => {
      try {
        const payrollData = await fetchPayroll();
        setData(payrollData); // Set the fetched payroll data to state
      } catch (error) {
        console.error('Error fetching payroll data:', error);
      }
    };

    fetchPayrollData();
  }, [hrAdminId]);

  // Fetch payroll data from the API using Axios
  const fetchPayroll = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/payroll/allByDepartement');
      return response.data; // Return the data from the Axios response
    } catch (error) {
      throw new Error('Failed to fetch payroll data');
    }
  };

  return (
    <Card className="shadow-lg">
      <CardContent>
        <Typography variant="h6" className="font-semibold mb-4">
          Payroll Expenses by Department
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="department" tick={<CustomTick />} /> {/* Custom tick with icons */}
            <YAxis />
            <Tooltip />
            <Bar dataKey="payroll" fill="#3f51b5" /> {/* Display payroll amount on Y-axis */}
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default PayrollChart;
