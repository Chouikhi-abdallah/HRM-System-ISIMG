const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const createPayroll= async (req,res)=>{
    const {employeeId,salary,paymentDate}=req.body; 
    try{
        //if the employee doesn't exist, return an error
        const employee= await prisma.employee.findUnique({
            where:{
                id: parseInt(employeeId)
            }
        });
        if(!employee){
            res.status(404).json({error: 'Employee not found'});
            return;
        }
        const payroll= await prisma.payroll.create({
            data:{
                salary: parseInt(salary),
                paymentDate:new Date(paymentDate),
                employeeId: parseInt(employeeId)
            }
        });
        res.json({"message":"Payroll created successfully"});
        res.status(200);
    }
    catch(error){
        res.status(500).json({error: 'Could not create payroll'});
    }};
const getPayrollByEmployeeId= async (req,res)=>{
    const {employeeId}= req.params;
    try{
        const payroll= await prisma.payroll.findMany({
            where:{
                employeeId: parseInt(employeeId)
            }
        });
        res.json(payroll);
        res.status(200);
    }
    catch(error){
        res.status(500).json({error: 'Could not get payroll'});
    }
};

const getPayrollById= async (req,res)=>{
    const {payrollId}= req.params;
    try{
        const payroll= await prisma.payroll.findUnique({
            where:{
                id: parseInt(payrollId)
            }
        });
        res.json(payroll);
        res.status(200);
    }
    catch(error){
        res.status(500).json({error: 'Could not get payroll'});
    }
}

const updatePayroll= async (req,res)=>{
    const {payrollId}= req.params;
    const {salary,paymentDate}=req.body;
    try{
        const payroll= await prisma.payroll.update({
            where:{
                id: parseInt(payrollId)
            },
            data:{
                salary: parseInt(salary),
                paymentDate:new Date(paymentDate)
            }
        });
        res.json({"message":"Payroll updated successfully"});
        res.status(200);
    }
    catch(error){
        res.status(500).json({error: 'Could not update payroll'});
    }
};

const deletePayroll= async (req,res)=>{
    const {payrollId}= req.params;
    try{
        const payroll= await prisma.payroll.delete({
            where:{
                id: parseInt(payrollId)
            }
        });
        res.json({"message":"Payroll deleted successfully"});
        res.status(200);
    }
    catch(error){
        res.status(500).json({error: 'Could not delete payroll'});
    }
};

module.exports={createPayroll,getPayrollByEmployeeId,getPayrollById,updatePayroll,deletePayroll};

