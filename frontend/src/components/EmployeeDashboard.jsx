/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from 'recharts';
import moment from 'moment';
import { Card, CardContent, Typography, Grid, List, ListItem, ListItemText } from '@mui/material';

const EmployeeDashboard = ({ tasks }) => {
  const [upcomingDeadlines, setUpcomingDeadlines] = useState([]);

  useEffect(() => {
    const upcoming = tasks
      .filter(task => task.completionDate && moment(task.completionDate).isAfter(moment()))
      .sort((a, b) => new Date(a.completionDate) - new Date(b.completionDate))
      .slice(0, 5);
    setUpcomingDeadlines(upcoming);
  }, [tasks]);

  const taskCompletionData = [
    { name: 'Pending', value: tasks.filter(task => task.status === 'PENDING').length },
    { name: 'In Progress', value: tasks.filter(task => task.status === 'INPROGRESS').length },
    { name: 'Completed', value: tasks.filter(task => task.status === 'COMPLETED').length }
  ];

  const taskTimelineData = tasks
    .filter(task => task.status === 'COMPLETED' && task.completionDate)
    .map(task => ({
      name: moment(task.completionDate).format('YYYY-MM-DD'),
      tasks: 1,
    }))
    .reduce((acc, task) => {
      const existing = acc.find(item => item.name === task.name);
      if (existing) {
        existing.tasks += 1;
      } else {
        acc.push(task);
      }
      return acc;
    }, []);

  const departmentData = tasks.reduce((acc, task) => {
    const dept = task.employee.department.name;
    acc[dept] = (acc[dept] || 0) + 1;
    return acc;
  }, {});

  const departmentChartData = Object.keys(departmentData).map(dept => ({
    name: dept,
    tasks: departmentData[dept]
  }));

  const COLORS = ['#FFBB28', '#FF8042', '#00C49F'];

  return (
    <div className="p-6">
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card className="shadow-lg">
            <CardContent>
              <Typography variant="h6" className="mb-4 font-semibold text-blue-700">Task Completion</Typography>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={taskCompletionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({  percent }) => `${(percent * 100).toFixed(0)}%`}
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {taskCompletionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card className="shadow-lg">
            <CardContent>
              <Typography variant="h6" className="mb-4 font-semibold text-blue-700">Task Timeline</Typography>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={taskTimelineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="tasks" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card className="shadow-lg">
            <CardContent>
              <Typography variant="h6" className="mb-4 font-semibold text-blue-700">Task Distribution by Department</Typography>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={departmentChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="tasks" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card className="shadow-lg">
            <CardContent>
              <Typography variant="h6" className="mb-4 font-semibold text-blue-700">Upcoming Deadlines</Typography>
              <List>
                {upcomingDeadlines.length > 0 ? (
                  upcomingDeadlines.map(task => (
                    <ListItem key={task.id}>
                      <ListItemText primary={task.title} secondary={`Due on ${moment(task.completionDate).format('MMMM Do YYYY')}`} />
                    </ListItem>
                  ))
                ) : (
                  <Typography>No upcoming deadlines.</Typography>
                )}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default EmployeeDashboard;
