const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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


module.exports={
    getAllEmployees,
    getEmployeeById
}; 