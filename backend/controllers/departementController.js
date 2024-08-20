const {PrismaClient}=require('@prisma/client');
const prisma=new PrismaClient();

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