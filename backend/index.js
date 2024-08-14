const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authRoutes = require('./routes/authRoutes');

const app = express();
const prisma = new PrismaClient();

app.use(express.json()); // Middleware to parse JSON bodies

app.get('/', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

// Mount authentication routes at /api/auth
app.use('/api/auth', authRoutes);



const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
