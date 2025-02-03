import  { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ManageTrainings from '../components/ManageTraining';
import ManageLeave from '../components/ManageLeave';
import Dashboard from '../components/HrAdminDashboard/Dashboard';
import ManagePayrolls from '../components/ManagePayroll';
import UpdateVisitor from '../components/updateProfile';

function Admin() {
  const [activeContent, setActiveContent] = useState('Dashboard');

  const userRole = 'HRADMIN';

  const visitorId=sessionStorage.getItem('userId');
  console.log("visitorId",visitorId);
  const hrAdminId=sessionStorage.getItem('UserIdByRole');
  console.log("hrAdminId",hrAdminId);


  const renderContent = () => {
    switch (activeContent) {
      case 'Dashboard':
        return <Dashboard hrAdminId={hrAdminId} />;
      case 'Manage Payrolls':
        return <ManagePayrolls hrAdminId={hrAdminId}/>;
      case 'Manage Leaves':
        return <ManageLeave hrAdminId={hrAdminId}/>;
      case 'Manage Trainings':
        return <ManageTrainings hrAdminId={hrAdminId} />;
      case 'Profile':
        return <UpdateVisitor visitorId={visitorId} />;
      default:
        return <Dashboard hrAdminId={hrAdminId} />;
    }
  };

  return (
    <div className="flex">
      <Sidebar userRole={userRole} setActiveContent={setActiveContent} />
      <div className="flex-1 p-6">{renderContent()}</div>
    </div>
  );
}

export default Admin;
