const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authRoutes = require('./routes/authRoutes');
const managerRouter= require('./routes/managerRoute');
const employeeRouter= require('./routes/employeeRoutes');
const taskRouter= require('./routes/taskRoutes');
const payrollRouter= require('./routes/payrollRoutes');
const departementRouter= require('./routes/departementsRoute');
const visitorRouter= require('./routes/visitorsRoutes');
const cors=require('cors');
const app = express();
const prisma = new PrismaClient();


// Parse incoming JSON content of requests or response
// and make them available in req.body as an object
app.use(express.json()); 

app.use(cors());


app.get('/', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

// add authentication routes to /api/auth
app.use('/api/auth', authRoutes);
// add employee routes to /api/employees
app.use('/api/employees', employeeRouter);
// add manager routes to /api/managers
app.use('/api/managers', managerRouter);
// add task routes to /api/tasks
app.use('/api/tasks', taskRouter);
//add payroll routes to /api/payrolls
app.use('/api/payroll',payrollRouter);
//add department routes to /api/departments
app.use('/api/departments',departementRouter );
// add visitor routes to /api/visitors
app.use('/api/visitors', visitorRouter);


// add a route to handle 404 errors
app.use('*', (req, res) => { 
  res.status(404).json({ error: 'Not found' });
}); 



const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
