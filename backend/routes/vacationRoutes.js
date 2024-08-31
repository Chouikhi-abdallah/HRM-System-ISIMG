const {getVacationsByEmployee,changeStatus, createRequest,getVacationsByHrId}=require('../controllers/vacationController');
const express=require('express');
const router=express.Router();

router.post('/createRequest',createRequest);
router.put('/changeStatus',changeStatus);
router.get('/getVacationsByEmployee/:employeeId',getVacationsByEmployee);
router.get('/getVacationsByHrId/:hrAdminId',getVacationsByHrId);

module.exports=router;