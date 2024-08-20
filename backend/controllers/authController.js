const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const authHelper = require('../helpers/authHelper');


// this is the logic for adding users to the datab  se

const signup = async (req, res) => {
  const { firstName, lastName, email, password, visitorType, departmentName } = req.body;

  try {
    // Check if email already exists
    const existingVisitor = await prisma.visitor.findUnique({ where: { email } });
    if (existingVisitor) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // Hashing the password using bcrypt
    const hashedPassword = await authHelper.hashPassword(password);

   // adding visitor to the database
    const visitor = await prisma.visitor.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        visitorType,
      }
    });
    // if the visitor isn't an HRadmin we will have in the request body the departmenet name 
    //to add so the employee or the manger after adding the visitor

    // Find the department using findUnique
    const department = await prisma.department.findUnique({ where: { name: departmentName } });
    if (!department) {
      return res.status(400).json({ error: 'Department does not exist' });
    }

    const departmentId = department.id;

    // Create the Employee or the manager or the HRadmin
    switch (visitorType) {
      case 'EMPLOYEE':
        await prisma.employee.create({
          data: {
            visitor: { connect: { id: visitor.id } },
            department: { connect: { id: departmentId } }
          }
        });
        break;

      case 'MANAGER':
        await prisma.manager.create({
          data: {
            visitor: { connect: { id: visitor.id } },
            department: { connect: { id: departmentId } }
          }
        });
        break;

        case 'HRADMIN':
            await prisma.hRAdmin.create({
                data: {
                    visitor: { connect: { id: visitor.id } }
                     }
                }
            );
        break;

      default:
        return res.status(400).json({ error: 'Invalid visitor type' });
    }

    // Generate a token for the new user
    const token = authHelper.generateToken({ id: visitor.id, visitorType });

    // Respond with success
    // 201: Created
    res.status(201).json({ message: 'User created successfully', token });
  } catch (error) {
    // 500: Internal Server Error
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
    const token = authHelper.generateToken({ id: visitor.id, visitorType: visitor.visitorType });

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
