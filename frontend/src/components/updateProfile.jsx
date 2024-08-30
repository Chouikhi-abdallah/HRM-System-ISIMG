/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  TextField, Button, Grid, Container, Typography
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateVisitor = ({ visitorId }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    // Fetch visitor details when the component mounts
    const fetchVisitorDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/visitors/${visitorId}`);
        const visitor = response.data;
        setFirstName(visitor.firstName);
        setLastName(visitor.lastName);
        setEmail(visitor.email);
        setPhone(visitor.phone);
      } catch (error) {
        console.error('Error fetching visitor details:', error);
        toast.error('Could not fetch visitor details');
      }
    };

    fetchVisitorDetails();
  }, [visitorId]);

  const handleUpdateVisitor = async () => {
    try {
      await axios.put(`http://localhost:5000/api/visitors/${visitorId}`, {
        firstName,
        lastName,
        email,
        password,
        phone
      });
      toast.success('Visitor updated successfully');
    } catch (error) {
      console.error('Error updating visitor:', error);
      if (error.response && error.response.status === 400) {
        toast.error('Email already in use');
      } else {
        toast.error('Could not update visitor');
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Update Profile
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="First Name"
            variant="outlined"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required

          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Last Name"
            variant="outlined"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Phone"
            variant="outlined"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
           
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdateVisitor}
            required
          >
            Update Profile
          </Button>
        </Grid>
      </Grid>
      <ToastContainer />
    </Container>
  );
};

export default UpdateVisitor;
