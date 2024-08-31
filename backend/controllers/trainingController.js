const {PrismaClient}=require('@prisma/client');
const prisma = new PrismaClient();

const createTraining = async (req, res) => {
    const { title,description,schedule,hrAdminId } = req.body;
    try {
        const training = await prisma.training.create({
            data: {
                title:title,
                description:description,
                schedule: new Date(schedule),
                hrAdminId: parseInt(hrAdminId),
            },
        });

        res.status(200).json({ message: 'Training created successfully' });
    } catch (error) {
        console.error('Error creating training:', error);
        res.status(500).json({ error: 'Could not create training' });
    }
}

const getAll = async (req, res) => {
    const { hrAdminId } = req.params;
    try {
        const trainings = await prisma.training.findMany({
            where: {
                hrAdminId: parseInt(hrAdminId)
            }
        });
        console.log(trainings);
        res.status(200).json(trainings);
    } catch (error) {
        console.error(error); 
        res.status(500).json({ error: 'Could not get trainings' });
    }
};


const deleteTraining= async(req,res)=>{
    const {trainingId}=req.body;
    try{
        const training=await prisma.training.findUnique({
            where:{
                id:parseInt(trainingId)
            }
        });
        if(!training){
            res.status(404).json({error:'Training not found'});
            return;
        }
        await prisma.training.delete({
            where:{
                id:parseInt(trainingId)
            }
        });
        res.status(200).json({message:'Training deleted successfully'});
    }catch(error){
        console.error('Error deleting training:',error);
        res.status(500).json({error:'Could not delete training'});
    }

};

const updateTraining=async(req,res)=>{

    const {trainingId,title,description,schedule}=req.body;
    try{
        const training=await prisma.training.findUnique({
            where:{
                id:parseInt(trainingId)
            }
        });
        if(!training){
            res.status(404).json({error:'Training not found'});
            return;
        }
        const updatedTraining=await prisma.training.update({
            where:{
                id:parseInt(trainingId)
            },
            data:{
                title:title,
                description:description,
                schedule:new Date(schedule)
            }
        });
        res.status(200).json({message:'Training updated successfully'});
    }
    catch(error){
        console.error('Error updating training:',error);
        res.status(500).json({error:'Could not update training'});
    }
}   



module.exports = {createTraining,getAll,deleteTraining,updateTraining};
