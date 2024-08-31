/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  TextField, Button, MenuItem, Select, InputLabel, FormControl, Grid, Container, Typography
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const TaskDistribute = () => {
  const [employees, setEmployees] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('PENDING');
  const [completionDate, setCompletionDate] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [managerId, setManagerId] = useState(localStorage.getItem('UserIdByRole'));
  const [departmentId, setDepartmentId] = useState(localStorage.getItem('userdepartmentId'));

  useEffect(() => {
    // Fetch employees when the component mounts
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/employees/bydepartment/${departmentId}`);
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, [departmentId]);

  const handleCreateTask = async () => {
    try {
      await axios.post('http://localhost:5000/api/tasks/create', {
        title,
        description,
        status: status.toUpperCase(), // Convert to uppercase
        completionDate,
        employeeId: selectedEmployee,
        managerId,
      });
      toast.success('Task created successfully');
      setTitle('');
      setDescription('');
      setStatus('PENDING');
      setCompletionDate('');
      setSelectedEmployee('');
    } catch (error) {
      console.error('Error creating task:', error);
      toast.error('Could not create task');
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Distribute Tasks
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Task Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              label="Status"
            >
              <MenuItem value="PENDING">Pending</MenuItem>
              <MenuItem value="INPROGRESS">In Progress</MenuItem>
              <MenuItem value="COMPLETED">Completed</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="date"
            label="Completion Date"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            value={completionDate}
            onChange={(e) => setCompletionDate(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Assign to Employee</InputLabel>
            <Select
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
              label="Assign to Employee"
            >
              {employees.map((emp) => (
                <MenuItem key={emp.id} value={emp.id}>
                  {emp.firstName} {emp.lastName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateTask}
          >
            Create Task
          </Button>
        </Grid>
      </Grid>
      <ToastContainer />
    </Container>
  );
};

export default TaskDistribute;
