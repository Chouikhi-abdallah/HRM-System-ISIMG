/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import UpdateVisitor from '../components/updateProfile';
import Kanban from '../components/Kanban';
import axios from 'axios';
import Spinner from '../components/Spinner';
import EmployeeDashboard from '../components/EmployeeDashboard';
import RefreshIcon from '@mui/icons-material/Refresh';
import IconButton from '@mui/material/IconButton';
import RequestLeave from '../components/RequestLeave';

function Employee() {
  const [activeContent, setActiveContent] = useState('Tasks');
  const [employeeData, setEmployeeData] = useState(null);
  const [taskCount, setTaskCount] = useState(0);
  const [tasks, setTasks] = useState([]);
  const userRole = 'EMPLOYEE';
  const id = localStorage.getItem('userId');
  const employeeId = localStorage.getItem('UserIdByRole');
  const employeedepartmentId = localStorage.getItem('userdepartmentId');

  const fetchEmployeeData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/employees/byid/${employeeId}`);
      console.log('employee Data:', response.data);
      setEmployeeData(response.data);

      const tasksResponse = await axios.get(`http://localhost:5000/api/tasks/TaskByemployeeId/${employeeId}`);
      console.log('Tasks Response:', tasksResponse.data);
      setTaskCount(tasksResponse.data.length);
      setTasks(tasksResponse.data);
    } catch (error) {
      console.error('Error fetching manager data:', error);
    }
  };

  useEffect(() => {
    fetchEmployeeData();
  }, [employeeId, employeedepartmentId]);

  const renderContent = () => {
    if (!employeeData) {
      return <Spinner />; 
    }
    switch (activeContent) {
      case 'Dashboard':
        return (
          <div>
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-semibold">
                {employeeData.visitor.firstName} {employeeData.visitor.lastName} Dashboard
              </h1>
              <IconButton onClick={fetchEmployeeData} aria-label="refresh">
                <RefreshIcon className="text-blue-500" />
              </IconButton>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-300 rounded shadow-md text-white">
                You are an employee in the {employeeData.department.name} Department
              </div>
              <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-300 rounded shadow-md text-white">
                Department: {employeeData.department.name}
              </div>
              <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-300 rounded shadow-md text-white">
                Tasks: {taskCount}
              </div>
            </div>
            <EmployeeDashboard tasks={tasks} />
          </div>
        );
      case 'Tasks':
        return <Kanban employeeId={employeeId} />;
      case 'Chat':
        return <h1>Coming soon</h1>;
      case 'Request Vacation':
        return <RequestLeave employeeId={employeeId} />;
      case 'View Trainings':
        return <h1>View Trainings Content</h1>;
      case 'Profile':
        return <UpdateVisitor visitorId={id} />;
      default:
        return <EmployeeDashboard tasks={tasks} />;
    }
  };

  return (
    <div className="flex">
      <Sidebar userRole={userRole} setActiveContent={setActiveContent} />
      <div className="flex-1 p-6">{renderContent()}</div>
    </div>
  );
}

export default Employee;
