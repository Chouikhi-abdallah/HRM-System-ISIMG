/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const LeaveRequestsChart = ({ hrAdminId }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchLeaveData = async () => {
      try {
        const leaveData = await fetchLeaveRequests(hrAdminId);
        setData(formatLeaveData(leaveData));
      } catch (error) {
        console.error('Error fetching leave requests data:', error);
      }
    };

    fetchLeaveData();
  }, [hrAdminId]);

  const fetchLeaveRequests = async (hrAdminId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/vacations/getVacationsByHrId/${hrAdminId}`);
      return response.data; // Assuming the response is an array of vacation data
    } catch (error) {
      console.error('Error fetching leave requests:', error);
      return []; // Return an empty array in case of error
    }
  };

  const formatLeaveData = (vacations) => {
    // Transform vacations into the format expected by the chart
    const leaveData = vacations.reduce((acc, vacation) => {
      const month = new Date(vacation.startDate).toLocaleString('default', { month: 'short' });
      const existing = acc.find(item => item.month === month);

      if (existing) {
        existing[vacation.status] = (existing[vacation.status] || 0) + 1; // Increment the count for the status
      } else {
        acc.push({
          month,
          Approved: vacation.status === 'APPROVED' ? 1 : 0,
          Pending: vacation.status === 'PENDING' ? 1 : 0,
          Rejected: vacation.status === 'REJECTED' ? 1 : 0,
        });
      }

      return acc;
    }, []);

    return leaveData.sort((a, b) => new Date(`01 ${a.month}`) - new Date(`01 ${b.month}`));
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
