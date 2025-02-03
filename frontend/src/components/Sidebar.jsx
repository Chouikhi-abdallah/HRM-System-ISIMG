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
import NewspaperIcon from '@mui/icons-material/Newspaper';

function Sidebar({ userRole, setActiveContent }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    toast('Goodbye!', { autoClose: 3000 });
    setTimeout(() => {
      sessionStorage.removeItem('UserIdByRole');
      sessionStorage.removeItem('userdepartmentId');
      sessionStorage.removeItem('token');
      navigate('/login');
    }, 3000);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-full md:w-64 h-screen fixed flex flex-col justify-between bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
        <ul className="space-y-4 p-4 flex-grow">
          {userRole === 'HRADMIN' && (
            <>
              <li
                onClick={() => setActiveContent('Dashboard')}
                className="flex items-center p-2 hover:bg-indigo-500 rounded cursor-pointer transition-colors"
              >
                <DashboardIcon className="mr-2" />
                Dashboard
              </li>
              <li
                onClick={() => setActiveContent('Manage Payrolls')}
                className="flex items-center p-2 hover:bg-indigo-500 rounded cursor-pointer transition-colors"
              >
                <PayrollIcon className="mr-2" />
                Manage Payrolls
              </li>
              <li
                onClick={() => setActiveContent('Manage Leaves')}
                className="flex items-center p-2 hover:bg-indigo-500 rounded cursor-pointer transition-colors"
              >
                <LeaveIcon className="mr-2" />
                Manage Leaves
              </li>
              <li
                onClick={() => setActiveContent('Manage Trainings')}
                className="flex items-center p-2 hover:bg-indigo-500 rounded cursor-pointer transition-colors"
              >
                <TrainingIcon className="mr-2" />
                Manage Trainings
              </li>
              <li
                onClick={() => setActiveContent('Profile')}
                className="flex items-center p-2 hover:bg-indigo-500 rounded cursor-pointer transition-colors"
              >
                <ProfileIcon className="mr-2" />
                Profile
              </li>
            </>
          )}

          {userRole === 'MANAGER' && (
            <>
              <li
                onClick={() => setActiveContent('Dashboard')}
                className="flex items-center p-2 hover:bg-indigo-500 rounded cursor-pointer transition-colors"
              >
                <DashboardIcon className="mr-2" />
                Dashboard
              </li>
              <li
                onClick={() => setActiveContent('Manage Team')}
                className="flex items-center p-2 hover:bg-indigo-500 rounded cursor-pointer transition-colors"
              >
                <TeamIcon className="mr-2" />
                Manage Team
              </li>
              <li
                onClick={() => setActiveContent('Distribute Tasks')}
                className="flex items-center p-2 hover:bg-indigo-500 rounded cursor-pointer transition-colors"
              >
                <TaskIcon className="mr-2" />
                Distribute Tasks
              </li>
              <li
                onClick={() => setActiveContent('Rate Employee')}
                className="flex items-center p-2 hover:bg-indigo-500 rounded cursor-pointer transition-colors"
              >
                <RateIcon className="mr-2" />
                Rate Employee
              </li>
              <li
                onClick={() => setActiveContent('Chat')}
                className="flex items-center p-2 hover:bg-indigo-500 rounded cursor-pointer transition-colors"
              >
                <ChatIcon className="mr-2" />
                Chat
              </li>
              <li
                onClick={() => setActiveContent('Request Vacation')}
                className="flex items-center p-2 hover:bg-indigo-500 rounded cursor-pointer transition-colors"
              >
                <BeachAccessIcon className="mr-2" />
                Request Leave
              </li>
              <li
                onClick={() => setActiveContent('Profile')}
                className="flex items-center p-2 hover:bg-indigo-500 rounded cursor-pointer transition-colors"
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
                className="flex items-center p-2 hover:bg-indigo-500 rounded cursor-pointer transition-colors"
              >
                <DashboardIcon className="mr-2" />
                Dashboard
              </li>
              <li
                onClick={() => setActiveContent('Tasks')}
                className="flex items-center p-2 hover:bg-indigo-500 rounded cursor-pointer transition-colors"
              >
                <TasksIcon className="mr-2" />
                Tasks
              </li>
              <li
                onClick={() => setActiveContent('Chat')}
                className="flex items-center p-2 hover:bg-indigo-500 rounded cursor-pointer transition-colors"
              >
                <ChatIcon className="mr-2" />
                Chat
              </li>
              <li
                onClick={() => setActiveContent('Request Vacation')}
                className="flex items-center p-2 hover:bg-indigo-500 rounded cursor-pointer transition-colors"
              >
                <BeachAccessIcon className="mr-2" />
                Request Leave
              </li>
              <li
                onClick={() => setActiveContent('Profile')}
                className="flex items-center p-2 hover:bg-indigo-500 rounded cursor-pointer transition-colors"
              >
                <ProfileIcon className="mr-2" />
                Profile
              </li>
              <li
                onClick={() => setActiveContent('News')}
                className="flex items-center p-2 hover:bg-indigo-500 rounded cursor-pointer transition-colors"
              >
                <NewspaperIcon className="mr-2" />
                News
              </li>
            </>
          )}
        </ul>

        <div className="p-4">
          <li
            onClick={handleLogout}
            className="flex items-center p-2 hover:bg-indigo-500 rounded cursor-pointer transition-colors"
          >
            <LogoutIcon className="mr-2" />
            Logout
          </li>
        </div>

        <ToastContainer />
      </div>

      {/* Main Content Area */}
      <div className="flex-grow ml-64 p-6 overflow-auto">
        {/* Add your main content here */}
      </div>
    </div>
  );
}

export default Sidebar;
