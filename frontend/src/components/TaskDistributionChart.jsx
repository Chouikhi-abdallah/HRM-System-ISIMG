/* eslint-disable react/prop-types */
import  { useState, useEffect } from 'react';
import {
  PieChart, Pie, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Cell,
} from 'recharts';
import axios from 'axios';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const TaskDistributionChart = ({ managerId }) => {
  const [taskData, setTaskData] = useState([]);
  const [taskStatusData, setTaskStatusData] = useState([]);
  const [taskOverTimeData, setTaskOverTimeData] = useState([]);

  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/tasks/tasksByManagerId/${managerId}`);
        const tasks = response.data;

        // Task Distribution by Employee
        const taskCountByEmployee = tasks.reduce((acc, task) => {
          const employeeId = task.employeeId;
          if (!acc[employeeId]) {
            acc[employeeId] = 0;
          }
          acc[employeeId]++;
          return acc;
        }, {});

        const formattedTaskData = Object.keys(taskCountByEmployee).map((employee) => ({
          Id: employee,
          taskCount: taskCountByEmployee[employee],
        }));

        setTaskData(formattedTaskData);

        // Task Status Overview
        const taskStatus = {
          Completed: tasks.filter((task) => task.status === 'COMPLETED').length,
          InProgress: tasks.filter((task) => task.status === 'INPROGRESS').length,
          Pending: tasks.filter((task) => task.status === 'PENDING').length,
        };

        const formattedTaskStatusData = Object.keys(taskStatus).map((status) => ({
          name: status,
          value: taskStatus[status],
        }));

        setTaskStatusData(formattedTaskStatusData);

        // Task Distribution Over Time
        const taskOverTime = tasks.reduce((acc, task) => {
          const date = new Date(task.completionDate).toLocaleDateString();
          if (!acc[date]) {
            acc[date] = 0;
          }
          acc[date]++;
          return acc;
        }, {});

        const formattedTaskOverTimeData = Object.keys(taskOverTime).map((date) => ({
          date,
          taskCount: taskOverTime[date],
        }));

        setTaskOverTimeData(formattedTaskOverTimeData);

  

       
       

      } catch (error) {
        console.error('Error fetching task data:', error);
      }
    };

    fetchTaskData();
  }, [managerId]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
      {/* Pie Chart - Task Distribution by Employee */}
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie data={taskData} dataKey="taskCount" nameKey="name" cx="50%" cy="50%" outerRadius={60}>
            {taskData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      {/* Bar Chart - Task Distribution by Employee */}
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={taskData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="taskCount" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      {/* Donut Chart - Task Status Overview */}
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie data={taskStatusData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={60} fill="#82ca9d">
            {taskStatusData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      {/* Line Chart - Task Distribution Over Time */}
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={taskOverTimeData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="taskCount" stroke="#ff7300" />
        </LineChart>
      </ResponsiveContainer>

      
    </div>
  );
};

export default TaskDistributionChart;
