const express = require('express');
const { getAllDepartments}= require('../controllers/departementController');
const router = express.Router();

router.get('/all',getAllDepartments);

module.exports = router;
