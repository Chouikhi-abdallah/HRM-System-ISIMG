const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authRoutes = require('./routes/authRoutes');
const managerRouter= require('./routes/managerRoute');

const employeeRouter= require('./routes/employeeRoutes');

const app = express();
const prisma = new PrismaClient();


// Parse incoming JSON content of requests or response
// and make them available in req.body as an object
app.use(express.json()); 


app.get('/', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

// add authentication routes to /api/auth
app.use('/api/auth', authRoutes);
// add employee routes to /api/employees
app.use('/api/employees', employeeRouter);
// add manager routes to /api/managers
app.use('/api/managers', managerRouter);

// add a route to handle 404 errors
app.use('*', (req, res) => { 
  res.status(404).json({ error: 'Not found' });
}); 



const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
