/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  Dashboard as DashboardIcon,
  AttachMoney as PayrollIcon,
  Event as LeaveIcon,
  School as TrainingIcon,
  Group as TeamIcon,
  Assignment as TaskIcon,
  Star as RateIcon,
  Chat as ChatIcon,
  Person as ProfileIcon,
  AssignmentTurnedIn as TasksIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';


function Sidebar({ userRole, setActiveContent }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Show goodbye toast
    toast('Goodbye!', {
      autoClose: 3000, // 3 seconds
    });

    // Clear user data and navigate to login after 3 seconds
    setTimeout(() => {
      localStorage.removeItem('UserIdByRole');
      localStorage.removeItem('userdepartmentId');
      localStorage.removeItem('token');
      navigate('/login'); // Adjust this to your login route
    }, 3000);
  };

  return (
    <div className="w-full md:w-64 min-h-screen flex flex-col justify-between bg-indigo-600 text-white">
      <ul className="space-y-4 p-4 flex-grow">
        {userRole === 'HRADMIN' && (
          <>
            <li
              onClick={() => setActiveContent('Dashboard')}
              className="flex items-center p-2 hover:bg-black-700 rounded cursor-pointer"
            >
              <DashboardIcon className="mr-2" />
              Dashboard
            </li>
            <li
              onClick={() => setActiveContent('Manage Payrolls')}
              className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer"
            >
              <PayrollIcon className="mr-2" />
              Manage Payrolls
            </li>
            <li
              onClick={() => setActiveContent('Manage Leaves')}
              className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer"
            >
              <LeaveIcon className="mr-2" />
              Manage Leaves
            </li>
            <li
              onClick={() => setActiveContent('Manage Trainings')}
              className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer"
            >
              <TrainingIcon className="mr-2" />
              Manage Trainings
            </li>
          </>
        )}

        {userRole === 'MANAGER' && (
          <>
            <li
              onClick={() => setActiveContent('Dashboard')}
              className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer"
            >
              <DashboardIcon className="mr-2" />
              Dashboard
            </li>
            <li
              onClick={() => setActiveContent('Manage Team')}
              className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer"
            >
              <TeamIcon className="mr-2" />
              Manage Team
            </li>
            <li
              onClick={() => setActiveContent('Distribute Tasks')}
              className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer"
            >
              <TaskIcon className="mr-2" />
              Distribute Tasks
            </li>
            <li
              onClick={() => setActiveContent('Rate Employee')}
              className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer"
            >
              <RateIcon className="mr-2" />
              Rate Employee
            </li>
            <li
              onClick={() => setActiveContent('Chat')}
              className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer"
            >
              <ChatIcon className="mr-2" />
              Chat
            </li>
            <li
              onClick={() => setActiveContent('Profile')}
              className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer"
            >
              <ProfileIcon className="mr-2" />
              Profile
            </li>
          </>
        )}

        {userRole === 'EMPLOYEE' && (
          <>
          <li
              onClick={() => setActiveContent('Dashboard')}
              className="flex items-center p-2 hover:bg-black-700 rounded cursor-pointer"
            >
              <DashboardIcon className="mr-2" />
              Dashboard
            </li>
            <li
              onClick={() => setActiveContent('Tasks')}
              className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer"
            >
              <TasksIcon className="mr-2" />
              Tasks
            </li>
            <li
              onClick={() => setActiveContent('Chat')}
              className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer"
            >
              <ChatIcon className="mr-2" />
              Chat
            </li>
            <li
              onClick={() => setActiveContent('Request Vacation')}
              className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer"
            >
             <BeachAccessIcon className="mr-2" />
              request Leave
              </li>
            <li
              onClick={() => setActiveContent('Profile')}
              className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer"
            >
              <ProfileIcon className="mr-2" />
              Profile
            </li>
          </>
        )}
      </ul>

      <div className="p-4">
        <li
          onClick={handleLogout}
          className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer"
        >
          <LogoutIcon className="mr-2" />
          Logout
        </li>
      </div>

      {/* ToastContainer for displaying toast messages */}
      <ToastContainer />
    </div>
  );
}

export default Sidebar;
