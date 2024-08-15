const express = require('express');
const router = express.Router();
const {getAllEmployees, getEmployeeById}= require('../controllers/employeeController');

// Routes
router.get('/all', getAllEmployees);
router.get('/byid/:id', getEmployeeById);

module.exports = router;;