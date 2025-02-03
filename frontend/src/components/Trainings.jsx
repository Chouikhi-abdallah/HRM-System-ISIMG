/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Grid, Card, CardContent, Typography, CircularProgress, List, ListItem, ListItemText, Divider } from "@mui/material";

const Trainings = () => {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch training data from the backend
  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/trainings/alltraing");
        setTrainings(response.data);
      } catch (err) {
        setError("Failed to fetch trainings");
      } finally {
        setLoading(false);
      }
    };

    fetchTrainings();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="lg" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" style={{ textAlign: 'center', marginTop: '20px' }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  // Separate the completed and upcoming trainings
  const currentDate = new Date();
  const completedTrainings = trainings.filter(training => new Date(training.schedule) < currentDate);
  const upcomingTrainings = trainings.filter(training => new Date(training.schedule) >= currentDate);

  return (
    <Container maxWidth="lg" style={{ marginTop: "30px" }}>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        Trainings
      </Typography>

      {/* Upcoming Trainings */}
      <Typography variant="h5" gutterBottom align="center" color="secondary">
        Upcoming Trainings
      </Typography>
      <Grid container spacing={3}>
        {upcomingTrainings.map((training) => {
          const parsedDate = new Date(training.schedule);
          return (
            <Grid item xs={12} sm={6} md={4} key={training.id}>
              <Card elevation={6} style={{ borderRadius: '16px', height: '100%', backgroundColor: '#f0f0f0' }}>
                <CardContent>
                  <Typography variant="h6" color="primary" gutterBottom>
                    {training.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" paragraph>
                    {training.description}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Date: {parsedDate.toLocaleDateString("en-US")}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Divider */}
      <Divider style={{ margin: "40px 0" }} />

      {/* Completed Trainings */}
      <Typography variant="h5" gutterBottom align="center" color="textSecondary">
        Completed Trainings
      </Typography>
      <List>
        {completedTrainings.map((training) => {
          const parsedDate = new Date(training.schedule);
          return (
            <div key={training.id}>
              <ListItem>
                <ListItemText
                  primary={training.title}
                  secondary={`Completed on: ${parsedDate.toLocaleDateString("en-US")}`}
                />
              </ListItem>
              <Divider />
            </div>
          );
        })}
      </List>
    </Container>
  );
};

export default Trainings;
