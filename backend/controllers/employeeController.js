const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// this is the logic for getting all employees from the database
const getAllEmployees= async (req,res)=>{
    try{
        const employees= await prisma.employee.findMany({
          include:{
            visitor:true,
          }}
        );
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
            where: {id: parseInt(id)},
            include:{
              visitor: true,
              department:true // 
            }

        });
        res.json(employee);
        res.status(200);
    }
    catch(error){
        res.status(500).json({error: 'Could not get employee'});
    }
};

//modify this to get all employees by departement with the FirstName lastName and tasks where the status is completed

const getAllEmployeesByDepartement = async (req, res) => {
    const { departmentId } = req.params;
    try {
      // Fetch employees with visitor details
      const employees = await prisma.employee.findMany({
        where: {
          departmentId: parseInt(departmentId),
        },
        include: {
          visitor: true, // Include related Visitor model
        },
      });
  
      // Transform the result to include visitor details
      const employeesWithVisitorInfo = employees.map(employee => ({
        id: employee.id,
        departmentId: employee.departmentId,
        firstName: employee.visitor.firstName,
        lastName: employee.visitor.lastName,
        email: employee.visitor.email,
        phone: employee.visitor.phone,
        sex: employee.visitor.sex,
        visitorType: employee.visitor.visitorType,
        age: employee.visitor.age,
      }));
  
      res.json(employeesWithVisitorInfo);
      res.status(200);
    } catch (error) {
      res.status(500).json({ error: 'Could not get employees' });
    }
  };



module.exports={
    getAllEmployees,
    getEmployeeById,
    getAllEmployeesByDepartement
}; 