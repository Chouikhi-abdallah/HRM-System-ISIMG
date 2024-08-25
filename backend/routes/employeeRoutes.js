const express = require('express');
const router = express.Router();
const {getAllEmployees, getEmployeeById,getAllEmployeesByDepartement}= require('../controllers/employeeController');

// Routes
router.get('/all', getAllEmployees);
router.get('/byid/:id', getEmployeeById);
router.get('/bydepartment/:departmentId', getAllEmployeesByDepartement);

module.exports = router;