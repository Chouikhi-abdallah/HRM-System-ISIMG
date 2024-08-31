/* eslint-disable react/prop-types */
// src/components/Dashboard/RecentActivities.jsx
import  { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Tabs, Tab, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const RecentActivities = ({ hrAdminId }) => {
  const [value, setValue] = useState(0);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [upcomingTrainings, setUpcomingTrainings] = useState([]);
  const [newEmployees, setNewEmployees] = useState([]);

  useEffect(() => {
    // Fetch data for all tabs
    fetchRecentLeaveRequests();
    fetchUpcomingTrainings();
    fetchNewEmployees();
  }, [hrAdminId]);

  const fetchRecentLeaveRequests = async () => {
    // Replace with actual API call
    const data = [
      { id: 1, name: 'John Doe', department: 'Engineering', startDate: '2023-09-10', endDate: '2023-09-15', status: 'Pending' },
      { id: 2, name: 'Jane Smith', department: 'Marketing', startDate: '2023-09-12', endDate: '2023-09-14', status: 'Approved' },
    ];
    setLeaveRequests(data);
  };

  const fetchUpcomingTrainings = async () => {
    // Replace with actual API call
    const data = [
      { id: 1, title: 'Leadership Skills', date: '2023-09-20', participants: 25 },
      { id: 2, title: 'Advanced React', date: '2023-09-25', participants: 30 },
    ];
    setUpcomingTrainings(data);
  };

  const fetchNewEmployees = async () => {
    // Replace with actual API call
    const data = [
      { id: 1, name: 'Alice Johnson', department: 'Sales', joinedDate: '2023-09-01' },
      { id: 2, name: 'Bob Williams', department: 'Support', joinedDate: '2023-09-05' },
    ];
    setNewEmployees(data);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Card className="shadow-lg">
      <CardContent>
        <Typography variant="h6" className="font-semibold mb-4">
          Recent Activities
        </Typography>
        <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary">
          <Tab label="Leave Requests" />
          <Tab label="Upcoming Trainings" />
          <Tab label="New Employees" />
        </Tabs>
        <Box mt={2}>
          {value === 0 && (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Department</TableCell>
                    <TableCell>Start Date</TableCell>
                    <TableCell>End Date</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {leaveRequests.map((req) => (
                    <TableRow key={req.id}>
                      <TableCell>{req.name}</TableCell>
                      <TableCell>{req.department}</TableCell>
                      <TableCell>{req.startDate}</TableCell>
                      <TableCell>{req.endDate}</TableCell>
                      <TableCell>{req.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          {value === 1 && (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Participants</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {upcomingTrainings.map((training) => (
                    <TableRow key={training.id}>
                      <TableCell>{training.title}</TableCell>
                      <TableCell>{training.date}</TableCell>
                      <TableCell>{training.participants}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          {value === 2 && (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Department</TableCell>
                    <TableCell>Joined Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {newEmployees.map((emp) => (
                    <TableRow key={emp.id}>
                      <TableCell>{emp.name}</TableCell>
                      <TableCell>{emp.department}</TableCell>
                      <TableCell>{emp.joinedDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default RecentActivities;
