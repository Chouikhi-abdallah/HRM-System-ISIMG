/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, MenuItem, Select, InputLabel, FormControl, IconButton, Grid } from '@mui/material';
import { Download as DownloadIcon } from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jsPDF from 'jspdf';

function RequestLeave({ employeeId }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [hrAdmins, setHrAdmins] = useState([]);
  const [selectedHrAdmin, setSelectedHrAdmin] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch HR Admins from the backend
    const fetchHrAdmins = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/hradmins/all');
        setHrAdmins(response.data);
      } catch (error) {
        console.error('Error fetching HR Admins:', error);
      }
    };

    fetchHrAdmins();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/vacations/createRequest', {
        employeeId,
        startDate,
        endDate,
        hrAdminId: selectedHrAdmin,
      });

      if (response.status === 200) {
        toast.success('Vacation request created successfully!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
        setStartDate('');
        setEndDate('');
      }
    } catch (error) {
      toast.error('Failed to create vacation request.', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      console.error('Error creating vacation:', error);
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();

    // Header styling
    doc.setFontSize(18);
    doc.setFont('Helvetica', 'bold');
    doc.text('Leave Request', 105, 20, null, null, 'center');
    doc.setLineWidth(0.5);
    doc.line(20, 25, 190, 25);

    doc.setFontSize(12);
    doc.setFont('Helvetica', 'normal');
    doc.text(`Employee ID: ${employeeId}`, 20, 40);
    doc.text(`Start Date: ${startDate}`, 20, 50);
    doc.text(`End Date: ${endDate}`, 20, 60);
    doc.text(`HR Admin ID: ${selectedHrAdmin}`, 20, 70);
    doc.save('leave-request.pdf');
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      className="p-6 bg-white rounded shadow-md"
      sx={{
        maxWidth: { xs: '100%', sm: 400 },
        mx: 'auto',
        boxShadow: 3,
        borderRadius: 2,
        p: 3,
      }}
    >
      <Typography variant="h5" component="h2" className="text-center mb-4" sx={{ fontWeight: 'bold' }}>
        Request Leave
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth required>
            <InputLabel id="hr-admin-select-label">Select HR Admin</InputLabel>
            <Select
              labelId="hr-admin-select-label"
              value={selectedHrAdmin}
              onChange={(e) => setSelectedHrAdmin(e.target.value)}
            >
              {hrAdmins.map((admin) => (
                <MenuItem key={admin.id} value={admin.id}>
                  {admin.visitor.firstName} {admin.visitor.lastName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Start Date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            fullWidth
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="End Date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            fullWidth
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>

        <Grid item xs={12} container justifyContent="space-between" alignItems="center">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{
              bgcolor: 'primary.main',
              '&:hover': {
                bgcolor: 'primary.dark',
              },
              textTransform: 'none',
            }}
          >
            {loading ? 'Submitting...' : 'Submit Request'}
          </Button>
        </Grid>

        <Grid item xs={12} container justifyContent="flex-end">
          <IconButton
            color="secondary"
            onClick={downloadPDF}
            sx={{
              bgcolor: 'secondary.main',
              '&:hover': {
                bgcolor: 'secondary.dark',
              },
            }}
          >
            <DownloadIcon sx={{ color: 'white' }} />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
}

export default RequestLeave;
