const express = require('express');
const cors = require('cors');
const http = require('http');
const authRoutes = require('./routes/authRoutes');
const managerRouter = require('./routes/managerRoute');
const employeeRouter = require('./routes/employeeRoutes');
const taskRouter = require('./routes/taskRoutes');
const payrollRouter = require('./routes/payrollRoutes');
const departementRouter = require('./routes/departementsRoute');
const visitorRouter = require('./routes/visitorsRoutes');
const vacationRouter = require('./routes/vacationRoutes');
const hradminRouter = require('./routes/hradminsRoutes');
const trainingRouter = require('./routes/trainingRoutes');
const messageRouter = require('./routes/messageRoutes');

// Import socket.io initialization
//const { initSocket } = require('./socket');

const app = express();
//const server = http.createServer(app);

// Initialize socket.io
//initSocket(server);

app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRouter);
app.use('/api/managers', managerRouter);
app.use('/api/tasks', taskRouter);
app.use('/api/payroll', payrollRouter);
app.use('/api/departments', departementRouter);
app.use('/api/visitors', visitorRouter);
app.use('/api/vacations', vacationRouter);
app.use('/api/hradmins', hradminRouter);
app.use('/api/trainings', trainingRouter);
app.use('/api/messages', messageRouter);

app.use('*', (req, res) => {
  res.status(404).json({ error: 'Not found' });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

/*server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});*/
