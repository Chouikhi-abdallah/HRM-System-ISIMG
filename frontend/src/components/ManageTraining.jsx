/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import {
  Paper, Button, TextField, Typography, Grid, Card, CardContent, IconButton, Table, TableHead, TableRow,
  TableCell, TableBody, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Refresh as RefreshIcon } from '@mui/icons-material';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import TrainingCalendar from './TrainingCalendar';

function ManageTrainings({ hrAdminId }) {
  const [trainings, setTrainings] = useState([]);
  const [newTraining, setNewTraining] = useState({
    title: '',
    description: '',
    schedule: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editTrainingId, setEditTrainingId] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [trainingToDelete, setTrainingToDelete] = useState(null);

  useEffect(() => {
    handleRefresh();
  }, []);

  const handleCreateTraining = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/trainings/createTraining', {
        ...newTraining,
        hrAdminId
      });
      setTrainings((prev) => [...prev, response.data.training]);
      setNewTraining({ title: '', description: '', schedule: '' });
      toast.success('Training created successfully');
    } catch (error) {
      console.error('Error creating training:', error);
      toast.error('Failed to create training');
    }
  };

  const handleUpdateTraining = async () => {
    try {
      const response = await axios.put('http://localhost:5000/api/trainings/updateTraining', {
        trainingId: editTrainingId,
        ...newTraining
      });
      setTrainings((prev) => prev.map(training => (training.id === editTrainingId ? response.data.training : training)));
      setNewTraining({ title: '', description: '', schedule: '' });
      setIsEditing(false);
      setEditTrainingId(null);
      toast.success('Training updated successfully');
    } catch (error) {
      console.error('Error updating training:', error);
      toast.error('Failed to update training');
    }
  };

  const handleEditTraining = (training) => {
    setNewTraining({
      title: training.title,
      description: training.description,
      schedule: new Date(training.schedule).toISOString().slice(0, 16)
    });
    setEditTrainingId(training.id);
    setIsEditing(true);
  };

  const handleDeleteTraining = async () => {
    try {
      await axios.delete('http://localhost:5000/api/trainings/deleteTraining', {
        data: { trainingId: trainingToDelete.id }
      });
      setTrainings((prev) => prev.filter((training) => training.id !== trainingToDelete.id));
      setOpenDeleteDialog(false);
      toast.success('Training deleted successfully');
    } catch (error) {
      console.error('Error deleting training:', error);
      toast.error('Failed to delete training');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTraining((prev) => ({ ...prev, [name]: value }));
  };

  const handleRefresh = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/trainings/all/${hrAdminId}`);
      setTrainings(response.data || []);
    } catch (error) {
      console.error('Error fetching trainings:', error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditTrainingId(null);
    setNewTraining({ title: '', description: '', schedule: '' });
  };

  const handleOpenDeleteDialog = (training) => {
    setTrainingToDelete(training);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setTrainingToDelete(null);
  };

  return (
    <Paper elevation={3} className="p-6">
      <Grid container spacing={4} alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h4" component="h2" fontWeight="bold" color="primary">
            Manage Trainings
          </Typography>
        </Grid>
        <Grid item>
          <IconButton onClick={handleRefresh} color="primary">
            <RefreshIcon />
          </IconButton>
        </Grid>
      </Grid>

      <Grid container spacing={4} className="mt-4">
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h3" gutterBottom>
                {isEditing ? 'Edit Training' : 'Create New Training'}
              </Typography>
              <TextField
                label="Title"
                name="title"
                value={newTraining.title}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Description"
                name="description"
                value={newTraining.description}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                margin="normal"
              />
              <TextField
                label="Schedule"
                name="schedule"
                type="datetime-local"
                value={newTraining.schedule}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
              <Button
                variant="contained"
                color="primary"
                startIcon={isEditing ? <EditIcon /> : <AddIcon />}
                onClick={isEditing ? handleUpdateTraining : handleCreateTraining}
                fullWidth
                sx={{ marginTop: 2 }}
              >
                {isEditing ? 'Update Training' : 'Create Training'}
              </Button>
              {isEditing && (
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleCancelEdit}
                  fullWidth
                  sx={{ marginTop: 1 }}
                >
                  Cancel
                </Button>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h3" gutterBottom>
                Existing Trainings
              </Typography>
              {trainings.length > 0 ? (
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Title</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Schedule</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {trainings.map((training) => (
                      <TableRow key={training.id}>
                        <TableCell>{training.title}</TableCell>
                        <TableCell>{training.description}</TableCell>
                        <TableCell>{new Date(training.schedule).toLocaleString()}</TableCell>
                        <TableCell>
                          <IconButton color="primary" onClick={() => handleEditTraining(training)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton color="secondary" onClick={() => handleOpenDeleteDialog(training)}>
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <Typography variant="body1" color="textSecondary">
                  No trainings available. Create a new training to get started.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Delete Training</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the training "{trainingToDelete?.title}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteTraining} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer />
      <Grid item xs={12}>
    <TrainingCalendar hrAdminId={hrAdminId} />
</Grid>
    </Paper>
  );
}

export default ManageTrainings;
