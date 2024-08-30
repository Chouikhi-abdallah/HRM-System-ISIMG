const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const authHelper = require('../helpers/authHelper');
const nodemailer = require('nodemailer');




// this is the logic for adding users to the database (signup)

// async function signup to handle the request and response and async keyword is used to handle the promises and non-blocking code
const signup = async (req, res) => {
  // get the request from the body
  const { firstName, lastName, email, password, visitorType, departmentName, phone, sex,age } = req.body;

  try {
    // Check if email already exists
    const existingVisitor = await prisma.visitor.findUnique({ where: { email } });
    if (existingVisitor) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // Hash the password using bcrypt
    const hashedPassword = await authHelper.hashPassword(password);

    const intAge = parseInt(age);

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
        age: intAge,
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

    let token;

    if (visitor.visitorType === 'HRADMIN') {
      const hRAdmin = await prisma.hRAdmin.findUnique({ where: { visitorId: visitor.id } });
      token = authHelper.generateToken({ HrId: hRAdmin.id, visitorType: visitor.visitorType, id: visitor.id });
    } else if (visitor.visitorType === 'MANAGER') {
      const manager = await prisma.manager.findUnique({ where: { visitorId: visitor.id } });
      token = authHelper.generateToken({ managerId: manager.id, visitorType: visitor.visitorType, id: visitor.id, departmentId: manager.departmentId });
    } else if (visitor.visitorType === 'EMPLOYEE') {
      const employee = await prisma.employee.findUnique({ where: { visitorId: visitor.id } });
      token = authHelper.generateToken({ employeeId: employee.id, visitorType: visitor.visitorType, id: visitor.id, departmentId: employee.departmentId });
    }

    if (!token) {
      return res.status(400).json({ error: 'Invalid visitor type' });
    }

    // Respond with success
    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Login Error:', error);
    // 500: Internal Server Error
    res.status(500).json({ error: 'Error logging in' });
  }
};

// logic for forgetting the password 

const forgetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the visitor exists
    const visitor = await prisma.visitor.findUnique({ where: { email } });
    if (!visitor) {
      return res.status(404).json({ error: 'No account found with this email' });
    }

    // Generate a reset token using JWT
    const resetToken = authHelper.generateToken({ id: visitor.id });

    // Save the reset token (hashed) and its expiration date to the database
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now
    await prisma.visitor.update({
      where: { id: visitor.id },
      data: {
        resetPasswordToken: resetToken,
        resetPasswordExpires: resetTokenExpiry,
      },
    });

    // Create a reset URL (frontend should handle this)
    const resetUrl = `http://localhost:5173/resetpassword/${resetToken}`;

    // Configure the email transport using Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Use your email service provider
      auth: {
        user: process.env.EMAIL, // Your email
        pass: process.env.PASSWORD, // Your email password
      },
    });

    // Email content
    const mailOptions = {
      to: email,
      from: process.env.EMAIL,
      subject: 'Password Reset Request',
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
      Please click on the following link, or paste this into your browser to complete the process:\n\n
      ${resetUrl}\n\n
      If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Reset password link sent to email' });
  } catch (error) {
    console.error('Forget Password Error:', error);
    res.status(500).json({ error: 'Error sending reset password email' });
  }
};

const resetPassword = async (req, res) => {
  const { token, password } = req.body;

  try {
    // Verify the token
    const decoded = authHelper.verifyToken(token);
    if (!decoded) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Find the user by ID
    const visitor = await prisma.visitor.findUnique({ where: { id: decoded.id } });
    if (!visitor) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Hash the new password
    const hashedPassword = await authHelper.hashPassword(password);

    // Update the user's password
    await prisma.visitor.update({
      where: { id: visitor.id },
      data: { password: hashedPassword },
    });

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Reset Password Error:', error);
    res.status(500).json({ message: 'Error resetting password' });
  }
};

module.exports = {
  signup,
  login,
  forgetPassword,
  resetPassword, // Export the resetPassword function
};
