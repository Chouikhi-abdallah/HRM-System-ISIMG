const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const authHelper = require('../helpers/authHelper');


// this is the logic for adding users to the database (signup)

// async function signup to handle the request and response and async keyword is used to handle the promises and non-blocking code
const signup = async (req, res) => {
  // get the request from the body
  const { firstName, lastName, email, password, visitorType, departmentName, phone, sex } = req.body;

  try {
    // Check if email already exists
    const existingVisitor = await prisma.visitor.findUnique({ where: { email } });
    if (existingVisitor) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // Hash the password using bcrypt
    const hashedPassword = await authHelper.hashPassword(password);

    // Add visitor to the database
    const visitor = await prisma.visitor.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        visitorType,
        phone,
        sex,
      }
    });
    // check if the visitor is employee or manager to handle it with his departmenet
    if (visitorType === 'EMPLOYEE' || visitorType === 'MANAGER') {
      // Find the department id by name
      
      const department = await prisma.department.findUnique({ where: { name: departmentName } });
      if (!department) {
        // 400: Bad Request
        return res.status(400).json({ error: 'Department does not exist' });
      }

      const departmentId = department.id;

      if (visitorType === 'EMPLOYEE') {
        // await will wait for the promise to be resolved
        await prisma.employee.create({
          data: {
            visitor: { connect: { id: visitor.id } },
            department: { connect: { id: departmentId } },
          }
        });
      } else if (visitorType === 'MANAGER') {
        await prisma.manager.create({
          data: {
            visitor: { connect: { id: visitor.id } },
            department: { connect: { id: departmentId } },
          }
        });
      }
      // but if the user is HRAdmin no need to check the req.body.departement name directly create an HRAdmin
    } else if (visitorType === 'HRADMIN') {
      // Directly create HR Admin without department
      await prisma.hRAdmin.create({
        data: {
          visitor: { connect: { id: visitor.id } },
        }
      });
    } else {
      return res.status(400).json({ error: 'Invalid visitor type' });
    }

    // Generate a token for the new user
    const token = authHelper.generateToken({ id: visitor.id, visitorType });

    // Respond with success
    //201: Created
    res.status(201).json({ message: 'User created successfully', token });
  } catch (error) {
    console.error('Signup Error:', error);
    //500: Internal Server Error
    res.status(500).json({ error: 'Error signing up' });
  }
};


// the logic for the login (email (unique) and password)

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the visitor by email
    const visitor = await prisma.visitor.findUnique({ where: { email } });
    if (!visitor || !await authHelper.comparePassword(password, visitor.password)) {
        // 401: Unauthorized
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate a token for the logged-in user
    // the token is generated using the generateToken function from the authHelper file
    if(visitor.visitorType === 'HRADMIN'){
      const hRAdmin = await prisma.hRAdmin.findUnique({ where: { visitorId: visitor.id } });
      const token = authHelper.generateToken({ HrId: hRAdmin.id, visitorType: visitor.visitorType, id: visitor.id });
    }
    else if(visitor.visitorType === 'MANAGER'){
      const manager = await prisma.manager.findUnique({ where: { visitorId: visitor.id } });
      const token = authHelper.generateToken({ managerId: manager.id, visitorType: visitor.visitorType, id: visitor.id });
    }
    else{
      
    }

    // Respond with success
    res.json({ message: 'Login successful', token });
  } catch (error) {
    // 500: Internal Server Error
    res.status(500).json({ error: 'Error logging in' });
  }
};

// exports the functions to be used in the routes
module.exports = {
  signup,
  login,
};
