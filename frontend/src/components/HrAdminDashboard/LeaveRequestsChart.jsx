/* eslint-disable react/prop-types */
// src/components/Dashboard/LeaveRequestsChart.jsx
import  { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const LeaveRequestsChart = ({ hrAdminId }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchLeaveData = async () => {
      try {
        // Replace with actual API call
        const leaveData = await fetchLeaveRequests();
        setData(leaveData);
      } catch (error) {
        console.error('Error fetching leave requests data:', error);
      }
    };

    fetchLeaveData();
  }, [hrAdminId]);

  // Mock data
  const fetchLeaveRequests = async () => {
    return [
      { month: 'Jan', Approved: 10, Pending: 5, Rejected: 2 },
      { month: 'Feb', Approved: 12, Pending: 3, Rejected: 1 },
      { month: 'Mar', Approved: 8, Pending: 6, Rejected: 0 },
      { month: 'Apr', Approved: 15, Pending: 2, Rejected: 1 },
      { month: 'May', Approved: 9, Pending: 4, Rejected: 2 },
      { month: 'Jun', Approved: 13, Pending: 5, Rejected: 0 },
    ];
  };

  return (
    <Card className="shadow-lg">
      <CardContent>
        <Typography variant="h6" className="font-semibold mb-4">
          Leave Requests Over Time
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Approved" stroke="#4caf50" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="Pending" stroke="#ff9800" />
            <Line type="monotone" dataKey="Rejected" stroke="#f44336" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default LeaveRequestsChart;
