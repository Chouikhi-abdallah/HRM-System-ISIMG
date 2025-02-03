/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, MenuItem, Select, InputLabel, FormControl, IconButton, Grid, Card, CardContent } from '@mui/material';
import { Download as DownloadIcon, CheckCircle, HourglassEmpty, Cancel } from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jsPDF from 'jspdf';

function RequestLeave({ visitorId }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [hrAdmins, setHrAdmins] = useState([]);
  const [selectedHrAdmin, setSelectedHrAdmin] = useState('');
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState([]);

  // Define fetchRequests function
  const fetchRequests = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/vacations/getVacationsByVisitor/${visitorId}`);
      setRequests(response.data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

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
    fetchRequests(); // Fetch leave requests when component mounts
  }, [visitorId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/vacations/createRequest', {
        visitorId,
        startDate,
        endDate,
        hrAdminId: selectedHrAdmin,
      });

      if (response.status === 200) {
        toast.success('Vacation request created successfully!', {
          
        });
        setStartDate('');
        setEndDate('');
        fetchRequests(); // Fetch updated requests after submission
      }
    } catch (error) {
      toast.error('Failed to create vacation request.', {
        
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
    doc.text(`visitor ID: ${visitorId}`, 20, 40);
    doc.text(`Start Date: ${startDate}`, 20, 50);
    doc.text(`End Date: ${endDate}`, 20, 60);
    doc.text(`HR Admin ID: ${selectedHrAdmin}`, 20, 70);
    doc.save('leave-request.pdf');
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'APPROVED':
        return <CheckCircle sx={{ color: 'green' }} />;
      case 'PENDING':
        return <HourglassEmpty sx={{ color: 'orange' }} />;
      case 'REJECTED':
        return <Cancel sx={{ color: 'red' }} />;
      default:
        return <HourglassEmpty sx={{ color: 'gray' }} />;
    }
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

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
          My Leave Requests
        </Typography>
        <Grid container spacing={2}>
          {requests.map((request) => (
            <Grid item xs={12} key={request.id}>
              <Card sx={{ display: 'flex', alignItems: 'center', p: 2, bgcolor: '#f5f5f5' }}>
                {getStatusIcon(request.status)}
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="body2">
                    Start Date: {request.startDate} | End Date: {request.endDate}
                  </Typography>
                  <Typography variant="body2">
                    Status: {request.status}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default RequestLeave;
