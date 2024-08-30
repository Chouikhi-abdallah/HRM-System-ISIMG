const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

//this is the logic for creating a task

const createTask = async (req, res) => {
    const { title, description, status, completionDate, employeeId, managerId } = req.body;
    try {
        const employee = await prisma.employee.findUnique({
            where: {
                id: parseInt(employeeId)
            }
        });
        if (!employee) {
            res.status(404).json({ error: 'Employee not found' });
            return;
        }

        const task = await prisma.task.create({
            data: {
                title,
                description,
                status: status.toUpperCase(), // Convert to uppercase
                completionDate: new Date(completionDate),
                employeeId: parseInt(employeeId),
                managerId: parseInt(managerId)
            }
        });
        res.status(200).json({ message: 'Task created successfully' });
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ error: 'Could not create task' });
    }
};

// this is the logic for getting all tasks by employee id

const getTasksByEmployeeId= async (req,res)=>{
    const { employeeId } = req.params;
    try {
      const tasks = await prisma.task.findMany({
        where: {
          employeeId: parseInt(employeeId),
        },
        include: {
          employee: {
            include: {
              visitor: true,
              department:true // Fetch visitor details
            },
          },
        },
      });
  
      const responseTasks = tasks.map(task => ({
        ...task,
        employeeName: `${task.employee.visitor.firstName} ${task.employee.visitor.lastName}`,
      }));
  
      res.json(responseTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      res.status(500).send('Server error');
    }
  };

const getTaskById= async (req,res)=>{
    const {taskId}= req.params;
    try{
        const task= await prisma.task.findUnique({
            where:{
                id: parseInt(taskId)
            }
        });
        res.json(task);
        res.status(200);
    }
    catch(error){
        res.status(500).json({error: 'Could not get task'});
    }
}


//this is the logic for updating a task status

const changeTaskStatus= async (req,res)=>{
    const {taskId}= req.params;
    const {status}= req.body;
    try{
        const task= await prisma.task.update({
            where:{
                id: parseInt(taskId)
            },
            data:{
                status
            }
        });
        res.json(task);
        res.status(200);
    }
    catch(error){
        res.status(500).json({error: 'Could not update task status'});
    }
}

const getTasksByManagerId= async (req,res)=>{
    const {managerId}= req.params;
    try{
        const tasks= await prisma.task.findMany({
            where:{
                managerId: parseInt(managerId)
            }
        });
        res.json(tasks);
        res.status(200);
    }
    catch(error){
        res.status(500).json({error: 'Could not get tasks'});
    }
}

module.exports={ createTask, getTasksByEmployeeId, getTaskById, changeTaskStatus,getTasksByManagerId};
