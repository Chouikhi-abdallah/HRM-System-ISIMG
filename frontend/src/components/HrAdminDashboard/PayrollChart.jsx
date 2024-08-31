/* eslint-disable react/prop-types */
// src/components/Dashboard/PayrollChart.jsx
import  { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const PayrollChart = ({ hrAdminId }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchPayrollData = async () => {
      try {
        // Replace with actual API call
        const payrollData = await fetchPayroll();
        setData(payrollData);
      } catch (error) {
        console.error('Error fetching payroll data:', error);
      }
    };

    fetchPayrollData();
  }, [hrAdminId]);

  // Mock data
  const fetchPayroll = async () => {
    return [
      { department: 'HR', payroll: 15000 },
      { department: 'Engineering', payroll: 30000 },
      { department: 'Sales', payroll: 20000 },
      { department: 'Marketing', payroll: 18000 },
      { department: 'Support', payroll: 12000 },
    ];
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
            <XAxis dataKey="department" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="payroll" fill="#3f51b5" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default PayrollChart;
