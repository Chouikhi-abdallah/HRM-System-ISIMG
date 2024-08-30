import  { useState } from 'react';
import Sidebar from '../components/Sidebar';

function Admin() {
  const [activeContent, setActiveContent] = useState('Dashboard');
  const userRole = 'HRADMIN';

  const renderContent = () => {
    switch (activeContent) {
      case 'Dashboard':
        return <h1>HR Admin Dashboard with Overview</h1>;
      case 'Manage Payrolls':
        return <h1>Manage Payrolls Content</h1>;
      case 'Manage Leaves':
        return <h1>Manage Leaves Content</h1>;
      case 'Manage Trainings':
        return <h1>Manage Trainings Content</h1>;
      default:
        return <h1>HR Admin Dashboard with Overview</h1>;
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
