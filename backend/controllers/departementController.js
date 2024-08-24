const {PrismaClient}=require('@prisma/client');
const prisma=new PrismaClient();

// this is the logic for getting all departments from the database
//async keyword 

const getAllDepartments= async (req,res)=>{
    try{
        const departments= await prisma.department.findMany();
        res.json(departments);
        res.status(200);
    }
    catch(error){
        res.status(500).json({error: 'Could not get departments'});
    }
};

module.exports={
    getAllDepartments,
};