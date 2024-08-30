import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import TeamList from '../components/TeamList';
import TaskDistribute from '../components/Taskdistribute';
import TaskDistributionChart from '../components/TaskDistributionChart';
import Spinner from '../components/Spinner';
import UpdateVisitor from '../components/updateProfile';
function Manager() {
  const [activeContent, setActiveContent] = useState('Dashboard');
  const [managerData, setManagerData] = useState(null);
  const [taskCount, setTaskCount] = useState(0);

  const userRole = 'MANAGER';
  const id=localStorage.getItem('userId');
  const managerId = localStorage.getItem('UserIdByRole'); // Assuming you saved the userId in localStorage during login
  const departementId = localStorage.getItem('userdepartmentId');
  console.log('Manager ID:', managerId);

  useEffect(() => {
    // Fetch manager data when the component mounts
    const fetchManagerData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/managers/byid/${managerId}`);
        console.log('Manager Data:', response.data);
        setManagerData(response.data);
        
        // Fetch the count of tasks distributed by the manager
        const tasksResponse = await axios.get(`http://localhost:5000/api/tasks/tasksByManagerId/${managerId}`);
        console.log('Tasks Response:', tasksResponse.data);
        setTaskCount(tasksResponse.data.length);
      } catch (error) {
        console.error('Error fetching manager data:', error);
      }
    };

    fetchManagerData();
  }, [managerId, departementId]);

  const renderContent = () => {
    if (!managerData) {
      return <Spinner/>; // or return a loading spinner component
    }
  
    switch (activeContent) {
      case 'Dashboard':
        return (
          <div>
            <h1 className="text-xl font-semibold">
              {managerData.firstName} {managerData.lastName} Dashboard
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-300 rounded shadow-md text-white">
                 You are the Manager of {managerData.departmentName} Departement
              </div>
              <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-300 rounded shadow-md text-white">
                Department: {managerData.departmentName}
              </div>
              <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-300 rounded shadow-md text-white">
                Tasks Distributed: {taskCount}
              </div>
            </div>
            <TeamList departmentId={departementId}  />
            <TaskDistributionChart managerId={managerId} />

          </div>
        );
      case 'Manage Team':
        return <TeamList departmentId={departementId} />;
      case 'Distribute Tasks':
        return <TaskDistribute/>;
      case 'Rate Employee':
        return <h1>Rate Employee Content</h1>;
      case 'Chat':
        return <h1>Coming soon</h1>;
      case 'Profile':
        return <UpdateVisitor visitorId={id}  />;
      default:
        return <h1>Manager Dashboard</h1>;
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar userRole={userRole} setActiveContent={setActiveContent} />
      <div className="flex-1 p-6">{renderContent()}</div>
    </div>
  );
}

export default Manager;
