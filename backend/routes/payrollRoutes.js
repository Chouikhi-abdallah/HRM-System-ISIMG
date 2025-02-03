const express=require('express');
const router=express.Router();
const {getAllPayrolls,getPayrollByDepartment,createPayroll,getPayrollByVisitorId,getPayrollById,updatePayroll,deletePayroll}= require('../controllers/payrollcontroller');

router.get('/all',getAllPayrolls);
router.get('/allByDepartement',getPayrollByDepartment);
router.post('/create',createPayroll);
router.get('/payrollByVisitorId/:visitorId', getPayrollByVisitorId); 
router.get('/payrollById/:payrollId',getPayrollById);
router.put('/update/:payrollId',updatePayroll);
router.delete('/delete/:payrollId',deletePayroll);

module.exports=router;
