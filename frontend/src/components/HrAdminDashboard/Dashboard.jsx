/* eslint-disable react/prop-types */
// src/components/Dashboard/Dashboard.jsx
import { Grid } from '@mui/material';
import OverviewCards from './OverviewCards';
import LeaveRequestsChart from './LeaveRequestsChart';
import PayrollChart from './PayrollChart';
import TrainingParticipationChart from './TrainingParticipationChart';
import RecentActivities from './RecentActivities';
import DepartmentEmployeeChart from './DepartmentEmployeeChart';

const Dashboard = ({ hrAdminId }) => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Grid container spacing={4}>
        {/* Overview Cards */}
        <Grid item xs={12}>
          <OverviewCards hrAdminId={hrAdminId} />
        </Grid>

        {/* Charts */}
        <Grid item xs={12} md={6}>
          <LeaveRequestsChart hrAdminId={hrAdminId} />
        </Grid>
        <Grid item xs={12} md={6}>
          <PayrollChart hrAdminId={hrAdminId} />
        </Grid>

        <Grid item xs={12} md={6}>
          <TrainingParticipationChart hrAdminId={hrAdminId} />
        </Grid>
        <Grid item xs={12} md={6}>
          <DepartmentEmployeeChart hrAdminId={hrAdminId} />
        </Grid>

        {/* Recent Activities */}
        <Grid item xs={12}>
          <RecentActivities hrAdminId={hrAdminId} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
