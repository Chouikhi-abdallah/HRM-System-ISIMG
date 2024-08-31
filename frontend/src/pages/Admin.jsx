import  { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ManageTrainings from '../components/ManageTraining';
import ManageLeave from '../components/ManageLeave';
import Dashboard from '../components/HrAdminDashboard/Dashboard';

function Admin() {
  const [activeContent, setActiveContent] = useState('Dashboard');
  const userRole = 'HRADMIN';

  const visitorId=localStorage.getItem('visitorId');
  console.log(visitorId);
  const hrAdminId=localStorage.getItem('UserIdByRole');
  console.log(hrAdminId);


  const renderContent = () => {
    switch (activeContent) {
      case 'Dashboard':
        return <Dashboard hrAdminId={hrAdminId} />;
      case 'Manage Payrolls':
        return <h1>Manage Payrolls Content</h1>;
      case 'Manage Leaves':
        return <ManageLeave hrAdminId={hrAdminId}/>;
      case 'Manage Trainings':
        return <ManageTrainings hrAdminId={hrAdminId} />;
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
