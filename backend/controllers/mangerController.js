const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();


const getAllManagers= async (req,res)=>{
    try{
        const managers= await prisma.visitor.findMany({where: {visitorType: 'MANAGER'}});
        res.json(managers);
        res.status(200);
    }
    catch(error){
        res.status(500).json({error: 'Could not get managers'});
    }
}

const getManagerById= async (req,res)=>{    
    const {id}= req.params;
    try{
        const manager= await prisma.manager.findUnique({
            where: {id: parseInt(id)}
        });
        const dep=await prisma.department.findUnique({
            where: {id: parseInt(manager.departmentId)}
        });
        depatName=dep.name;
        const visitorData=await prisma.visitor.findUnique({ where: {id: parseInt(manager.visitorId)}});
        
        res.json({ 
            "id":manager.id,
            "firstName":visitorData.firstName,
            "lastName":visitorData.lastName,
            "email":visitorData.email,
            "departmentName":depatName,
        });
        res.status(200);
    }
    catch(error){
        res.status(500).json({error: 'Could not get manager'});
    }
};

module.exports={
    getAllManagers,
    getManagerById
};