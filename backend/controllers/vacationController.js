const {PrismaClient}=require('@prisma/client');
const prisma = new PrismaClient();

const createRequest = async (req, res) => {
    const { employeeId, startDate, endDate, hrAdminId } = req.body;
    try {
        const employee = await prisma.employee.findUnique({
            where: { id: parseInt(employeeId) },
        });
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        const hrAdmin = await prisma.hRAdmin.findUnique({
            where: { id: parseInt(hrAdminId) },
        });
        if (!hrAdmin) {
            return res.status(404).json({ error: 'HR Admin not found' });
        }

        const vacation = await prisma.vacation.create({
            data: {
                employeeId: parseInt(employeeId),
                hrAdminId: parseInt(hrAdminId),
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                status: 'PENDING',
            },
        });

        res.status(200).json({ message: 'Vacation request created successfully' });
    } catch (error) {
        console.error('Error creating vacation request:', error);
        res.status(500).json({ error: 'Could not create vacation request' });
    }
};

const changeStatus=async(req,res)=>{
    const {vacationId,status}=req.body;
    try{
        const vacation=await prisma.vacation.findUnique({
            where:{
                id:parseInt(vacationId)
            }
        });
        if(!vacation){
            res.status(404).json({error:'Vacation not found'});
            return;
        }
        const updatedVacation=await prisma.vacation.update({
            where:{
                id:parseInt(vacationId)
            },
            data:{
                status:status.toUpperCase()
            }
        });
        res.status(200).json({message:'Vacation status updated successfully'});
    }catch(error){
        console.error('Error updating vacation status:',error);
        res.status(500).json({error:'Could not update vacation status'});
    }
};

const getVacationsByEmployee=async(req,res)=>{
    const {employeeId}=req.params;
    try{
        const vacations=await prisma.vacation.findMany({
            where:{
                employeeId:parseInt(employeeId)
            }
        });
        res.status(200).json(vacations);
    }catch(error){
        console.error('Error getting vacations:',error);
        res.status(500).json({error:'Could not get vacations'});
    }
};

const getVacationsByHrId = async (req, res) => {
    const { hrAdminId } = req.params;
    try {
        const vacations = await prisma.vacation.findMany({
            where: { hrAdminId: parseInt(hrAdminId) },
            include: {
                employee: {
                    include: {
                        visitor: true,
                        department: true,
                    },
                },
            },
        });

        res.status(200).json(vacations);
    } catch (error) {
        console.error('Error getting vacations:', error);
        res.status(500).json({ error: 'Could not get vacations' });
    }
};


module.exports={
    createRequest,
    changeStatus,
    getVacationsByEmployee,
    getVacationsByHrId
}
