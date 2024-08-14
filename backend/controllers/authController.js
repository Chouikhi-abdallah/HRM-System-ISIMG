const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const signup = async (req, res) => {
  const { firstName, lastName, email, password, visitorType, departmentName } = req.body;

  try {
    // check if the visitor already exists
    const existingVisitor = await prisma.visitor.findUnique({ where: { email } });
    if (existingVisitor) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // Create new visitor
    const visitor = await prisma.visitor.create({
      data: {
        firstName,
        lastName,
        email,
        password, // Store the password as plain text
        visitorType
      }
    });

    // Find the department using findFirst
    const department = await prisma.department.findUnique({ where: { name: departmentName } });
    if (!department) {
      return res.status(400).json({ error: 'Department does not exist' });
    }

    const departmentId = department.id;

    // Create associated Employee or Manager
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

      default:
        return res.status(400).json({ error: 'Invalid visitor type' });
    }

    // Respond with success
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: 'Error signing up' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the visitor by email
    const visitor = await prisma.visitor.findUnique({ where: { email } });
    if (!visitor || visitor.password !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Respond with success
    res.json({ message: 'Login successful' });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: 'Error logging in' });
  }
};

module.exports = {
  signup,
  login,
};
