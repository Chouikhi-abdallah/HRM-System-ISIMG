/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const OverviewCards = ({ hrAdminId }) => {
  const [data, setData] = useState({
    totalEmployees: 0,
    pendingLeaves: 0,
    upcomingTrainings: 0,
    totalPayroll: 0,
  });

  useEffect(() => {
    // Fetch data from API endpoints and update state
    const fetchData = async () => {
      try {
        const totalEmployees = await fetchTotalEmployees();
        const pendingLeaves = await fetchPendingLeaves();
        const upcomingTrainings = await fetchUpcomingTrainings();
        const totalPayroll = await fetchTotalPayroll();

        setData({
          totalEmployees,
          pendingLeaves,
          upcomingTrainings,
          totalPayroll,
        });
      } catch (error) {
        console.error('Error fetching overview data:', error);
      }
    };

    fetchData();
  }, [hrAdminId]);

  const fetchTotalEmployees = async () => {
    const response = await fetch('http://localhost:5000/api/employees/all');
    const employees = await response.json();
    return employees.length; // Total number of employees
  };

  const fetchPendingLeaves = async () => {
    const response = await fetch(`http://localhost:5000/api/vacations/getVacationsByHrId/${hrAdminId}`);
    const vacations = await response.json();
    // Count pending leaves
    return vacations.filter(vacation => vacation.status === 'PENDING').length;
  };

  const fetchUpcomingTrainings = async () => {
    const response = await fetch(`http://localhost:5000/api/trainings/all/${hrAdminId}`);
    const trainings = await response.json();
    return trainings.length; // Total number of upcoming trainings
  };

  const fetchTotalPayroll = async () => {
    const response = await fetch('http://localhost:5000/api/payroll/all');
    const payrolls = await response.json();
    return payrolls.reduce((acc, payroll) => acc + payroll.salary, 0); // Total payroll amount
  };

  const cardData = [
    {
      title: 'Total Employees',
      value: data.totalEmployees,
      icon: <PeopleIcon fontSize="large" className="text-blue-500" />,
    },
    {
      title: 'Pending Leaves',
      value: data.pendingLeaves,
      icon: <EventNoteIcon fontSize="large" className="text-red-500" />,
    },
    {
      title: 'Upcoming Trainings',
      value: data.upcomingTrainings,
      icon: <AssignmentIcon fontSize="large" className="text-green-500" />,
    },
    {
      title: 'Total Payroll (This Month)',
      value: `${data.totalPayroll.toFixed(2)}`, // Format to 2 decimal places
      icon: <MonetizationOnIcon fontSize="large" className="text-yellow-500" />,
    },
  ];

  return (
    <Grid container spacing={4}>
      {cardData.map((card, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card className="shadow-lg">
            <CardContent className="flex items-center">
              <div className="mr-4">{card.icon}</div>
              <div>
                <Typography variant="h6" className="font-semibold">
                  {card.title}
                </Typography>
                <Typography variant="h4">{card.value}</Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default OverviewCards;
