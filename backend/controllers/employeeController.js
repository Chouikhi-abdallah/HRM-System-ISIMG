const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// this is the logic for getting all employees from the database
const getAllEmployees= async (req,res)=>{
    try{
        const employees= await prisma.employee.findMany();
        res.json(employees);
        res.status(200);
    }
    catch(error){
        res.status(500).json({error: 'Could not get employees'});
    }
};

// this is the logic for getting an employee by id from the database


const getEmployeeById= async (req,res)=>{
    const {id}= req.params;
    try{
        const employee= await prisma.employee.findUnique({
            where: {id: parseInt(id)}
        });
        res.json(employee);
        res.status(200);
    }
    catch(error){
        res.status(500).json({error: 'Could not get employee'});
    }
};

const getAllEmployeesByDepartement= async (req,res)=>{
    const {departmentId}= req.params;
    try{
        const employees= await prisma.employee.findMany({
            where:{
                departmentId: parseInt(departmentId)
            }
        });
        res.json(employees);
        res.status(200);
    }
    catch(error){
        res.status(500).json({error: 'Could not get employees'});
    }
}


module.exports={
    getAllEmployees,
    getEmployeeById
}; 