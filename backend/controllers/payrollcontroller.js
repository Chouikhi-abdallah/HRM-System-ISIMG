const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();


// this is the logic to getAllPayrolls
const getAllPayrolls = async (req, res) => {
    try {
        const payrolls = await prisma.payroll.findMany();
        res.status(200);
        res.json(payrolls); 
        
    } catch (error) {
        res.status(500).json({ error: 'Could not get payrolls' });
    }
};
const getPayrollByDepartment = async (req, res) => {
    try {
      // Fetch payrolls by joining with the Employee and Manager models
      const payrolls = await prisma.payroll.findMany({
        include: {
          visitor: {
            include: {
              employee: true, // Include employee to access departmentId
              manager: true,  // Include manager to access departmentId
            },
          },
        },
      });
  
      // Predefined department mapping
      const departmentMapping = {
        1: 'development',
        2: 'test',
        3: 'operation',
        4: 'security'
      };
  
      // Group payrolls by department and calculate total expenses
      const departmentPayrolls = payrolls.reduce((acc, payroll) => {
        const departmentId =
          payroll.visitor.employee?.departmentId || payroll.visitor.manager?.departmentId;
  
        if (departmentId && departmentMapping[departmentId]) {
          const departmentName = departmentMapping[departmentId];
          if (!acc[departmentName]) {
            acc[departmentName] = { department: departmentName, payroll: 0 };
          }
          acc[departmentName].payroll += payroll.salary;
        }
        return acc;
      }, {});
  
      res.status(200).json(Object.values(departmentPayrolls)); // Send the result as an array
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Could not get payrolls by department' });
    }
  };
  


//this is the logic for creating a payroll
const createPayroll = async (req, res) => {
    const { visitorId, salary, paymentDate,hrAdminId } = req.body;
    try {
        const visitor = await prisma.visitor.findUnique({
            where: { id: parseInt(visitorId) },
        });

        if (!visitor) {
            return res.status(404).json({ error: 'Visitor not found' });
        }

        // Create payroll without the employee object
        const payroll = await prisma.payroll.create({
            data: {
                salary: parseFloat(salary),
                paymentDate: new Date(paymentDate),
                visitorId: parseInt(visitorId),
                hrAdminId:parseInt(hrAdminId)
            },
        });
        res.status(201).json({ message: "Payroll created successfully", payroll });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Could not create payroll' });
    }
};


const getPayrollByVisitorId = async (req, res) => {
    const { visitorId } = req.params;
    try {
        const payroll = await prisma.payroll.findMany({
            where: {
                visitorId: parseInt(visitorId)
            }
        });
        if (payroll.length === 0) {
            return res.status(404).json({ error: 'No payrolls found for this visitor' });
        }
        res.status(200).json(payroll);
    } catch (error) {
        res.status(500).json({ error: 'Could not get payrolls' });
    }
};


//this is the logic for getting a payroll by id

const getPayrollById = async (req, res) => {
    const { payrollId } = req.params;
    try {
        const payroll = await prisma.payroll.findUnique({
            where: {
                id: parseInt(payrollId)
            }
        });
        if (!payroll) {
            return res.status(404).json({ error: 'Payroll not found' });
        }
        res.status(200).json(payroll); // Status before sending the response
    } catch (error) {
        res.status(500).json({ error: 'Could not get payroll' });
    }
};


const updatePayroll = async (req, res) => {
    const { payrollId } = req.params;
    const { salary, paymentDate } = req.body;
    try {
        const payroll = await prisma.payroll.update({
            where: {
                id: parseInt(payrollId)
            },
            data: {
                salary: parseFloat(salary), // Use parseFloat to handle decimals
                paymentDate: new Date(paymentDate)
            }
        });
        res.status(200).json({ message: "Payroll updated successfully" }); // Status before sending
    } catch (error) {
        res.status(500).json({ error: 'Could not update payroll' });
    }
};


const deletePayroll= async (req,res)=>{
    const {payrollId}= req.params;
    try{
        const payroll= await prisma.payroll.delete({
            where:{
                id: parseInt(payrollId)
            }
        });
        res.json({"message":"Payroll deleted successfully"});
        res.status(200);
    }
    catch(error){
        res.status(500).json({error: 'Could not delete payroll'});
    }
};

module.exports={getAllPayrolls,
                createPayroll,
                getPayrollByVisitorId,
                getPayrollById,
                updatePayroll,
                deletePayroll,
                getPayrollByDepartment};

