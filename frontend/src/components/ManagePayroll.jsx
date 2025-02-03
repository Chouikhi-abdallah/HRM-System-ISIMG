/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, IconButton } from '@mui/material';
import MoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import {
  TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Select, MenuItem, InputLabel, FormControl
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import StarIcon from '@mui/icons-material/Star';

function ManagePayrolls({ hrAdminId }) {
  const [payrolls, setPayrolls] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [managers, setManagers] = useState([]);
  const [selectedVisitorId, setSelectedVisitorId] = useState('');
  const [salary, setSalary] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [editPayrollId, setEditPayrollId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch all employees, managers, and payrolls on component mount
  const fetchData = async () => {
    try {
      const [employeeResponse, managerResponse, payrollResponse] = await Promise.all([
        axios.get('http://localhost:5000/api/employees/all'),
        axios.get('http://localhost:5000/api/managers/all'),
        axios.get('http://localhost:5000/api/payroll/all'), // Fetching all payrolls
      ]);
      setEmployees(employeeResponse.data);
      setManagers(managerResponse.data);
      setPayrolls(payrollResponse.data); // Set all payrolls initially
    } catch (error) {
      setError('Could not fetch data');
    }
  };

  // Handle payroll submission (create or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      visitorId: parseInt(selectedVisitorId),
      salary: parseFloat(salary),
      paymentDate,
      hrAdminId: parseInt(hrAdminId),
    };
    try {
      if (editPayrollId) {
        await axios.put(`http://localhost:5000/api/payroll/update/${editPayrollId}`, payload);
      } else {
        await axios.post('http://localhost:5000/api/payroll/create', payload);
      }
      await fetchData(); // Refresh payrolls after adding or updating
      resetForm();
    } catch (error) {
      setError(`Could not save payroll: ${error.response?.data?.error || 'Unknown error'}`);
    }
  };

  // Reset the form after submission or when canceling edit
  const resetForm = () => {
    setSelectedVisitorId('');
    setSalary('');
    setPaymentDate('');
    setEditPayrollId(null);
  };

  // Handle payroll deletion
  const handleDelete = async (payrollId) => {
    try {
      await axios.delete(`http://localhost:5000/api/payroll/delete/${payrollId}`);
      fetchData(); // Refresh payrolls after deletion
    } catch (error) {
      setError(`Could not delete payroll: ${error.response?.data?.error || 'Unknown error'}`);
    }
  };

  // Set form data for editing an existing payroll
  const handleEdit = (payroll) => {
    setEditPayrollId(payroll.id);
    setSelectedVisitorId(payroll.visitorId);
    setSalary(payroll.salary);
    setPaymentDate(payroll.paymentDate.slice(0, 10));
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Payrolls</h1>

      {/* Payroll Form */}
      <div className="mb-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormControl fullWidth className="mb-4">
            <InputLabel>Employee/Manager</InputLabel>
            <Select
              value={selectedVisitorId}
              onChange={(e) => setSelectedVisitorId(e.target.value)}
              label="Employee/Manager"
            >
              {employees.map((employee) => (
                <MenuItem key={employee.visitor.id} value={employee.visitor.id}>
                  <PersonIcon className="mr-2" />
                  {employee.visitor.firstName} {employee.visitor.lastName} (Employee)
                </MenuItem>
              ))}
              {managers.map((manager) => (
                <MenuItem key={manager.visitor.id} value={manager.visitor.id}>
                  <StarIcon className="mr-2" />
                  {manager.visitor.firstName} {manager.visitor.lastName} (Manager)
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Salary"
            type="number"
            variant="outlined"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            fullWidth
            className="mb-4"
          />
          <TextField
            label="Payment Date"
            type="date"
            variant="outlined"
            value={paymentDate}
            onChange={(e) => setPaymentDate(e.target.value)}
            fullWidth
            className="mb-4"
            InputLabelProps={{ shrink: true }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            {editPayrollId ? 'Update Payroll' : 'Add Payroll'}
          </Button>
          {editPayrollId && (
            <Button
              onClick={resetForm}
              variant="outlined"
              color="secondary"
              className="ml-2"
            >
              Cancel
            </Button>
          )}
        </form>
      </div>

      {/* Payrolls Table */}
      <div>
        {loading ? (
          <p>Loading payrolls...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : payrolls.length === 0 ? (
          <p>No payrolls found.</p>
        ) : (
          <TableContainer component={Paper} className="shadow-md">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Employee/Manager</TableCell>
                  <TableCell>Salary</TableCell>
                  <TableCell>Payment Date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {payrolls.map((payroll) => {
                  const employee = employees.find(emp => emp.visitor.id === payroll.visitorId);
                  const manager = managers.find(mgr => mgr.visitor.id === payroll.visitorId);
                  const name = employee
                    ? `${employee.visitor.firstName} ${employee.visitor.lastName} (Employee)`
                    : `${manager.visitor.firstName} ${manager.visitor.lastName} (Manager)`;

                  return (
                    <TableRow key={payroll.id}>
                      <TableCell>{name}</TableCell>
                      <TableCell>{payroll.salary}</TableCell>
                      <TableCell>{new Date(payroll.paymentDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Button 
                          onClick={() => handleEdit(payroll)}
                          variant="outlined"
                          sx={{ mr: 1 }}
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDelete(payroll.id)}
                          variant="outlined"
                          color="error"
                          
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );
}

export default ManagePayrolls;
