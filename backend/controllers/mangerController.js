const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

// this is the logic for getting all managers from the database
const getAllManagers = async (req, res) => {
    try {
        const managers = await prisma.manager.findMany({
            include: {
                visitor: {
                    select: {
                        id: true, // Include necessary fields
                        firstName: true,
                        lastName: true,
                        email: true,
                        // Don't include password
                    },
                },
            },
        });
        res.status(200).json(managers);
    } catch (error) {
        console.error('Error fetching managers:', error);
        res.status(500).json({ error: 'Could not get managers' });
    }
};



// this is the logic for getting a manager by id from the database
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