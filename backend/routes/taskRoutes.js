const express = require('express');
const router = express.Router();
const {createTask,getTasksByEmployeeId,getTaskById,changeTaskStatus,getTasksByManagerId}= require('../controllers/taskController');


router.post('/create',createTask);
router.get('/TaskByemployeeId/:employeeId',getTasksByEmployeeId);
router.get('/TaskById/:taskId',getTaskById);
router.put('/changeStatus/:taskId',changeTaskStatus);
router.get('/tasksByManagerId/:managerId',getTasksByManagerId);

module.exports=router;