const express=require('express');
const router=express.Router();
const {createPayroll,getPayrollByEmployeeId,getPayrollById,updatePayroll,deletePayroll}= require('../controllers/payrollcontroller');

router.post('/create',createPayroll);
router.get('/payrollByEmployeeId/:employeeId',getPayrollByEmployeeId);
router.get('/payrollById/:payrollId',getPayrollById);
router.put('/update/:payrollId',updatePayroll);
router.delete('/delete/:payrollId',deletePayroll);

module.exports=router;
