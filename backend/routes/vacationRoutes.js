const {getVacationsByVisitor,deleteVacation,changeStatus, createRequest,getVacationsByHrId}=require('../controllers/vacationController');
const express=require('express');
const router=express.Router();

router.post('/createRequest',createRequest);
router.put('/changeStatus',changeStatus);
router.get('/getVacationsByVisitor/:visitorId',getVacationsByVisitor);
router.get('/getVacationsByHrId/:hrAdminId',getVacationsByHrId);
router.delete('/deleteVacation/:vacationId',deleteVacation);

module.exports=router;