const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const authHelper = require('../helpers/authHelper');

// this is the logic for updating a user information in the database


// getAllvistiros an only firstName lastName and Role
const getAllVisitors = async (req, res) => {
    try {
        const visitors = await prisma.visitor.findMany({
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                sex: true,
            }
        });
        res.status(200).json(visitors);
    } catch (error) {
        console.error('Error fetching visitors:', error);
        res.status(500).json({ error: 'Could not get visitors' });
    }
};

const updateVisitor = async (req, res) => {
    // get the request from the body
    const { firstName, lastName, email, password,phone } = req.body;
    const id = parseInt(req.params.id);
    try {
        // Check if email already exists
        const existingVisitor = await prisma.visitor.findUnique({where: {email}});
        if (existingVisitor.length>=2) {
            return res.status(400).json({error: 'Email already in use'});
        }

        // Hash the password using bcrypt
        const hashedPassword = await authHelper.hashPassword(password);


        // Add visitor to the database
        const visitor = await prisma.visitor.update({
            where: {id: id},
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword,
                phone
            }
        });
        res.status(200).json({message: 'Visitor updated successfully', visitor});

    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
}


const getVisitorById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const visitor = await prisma.visitor.findUnique({
            where: { id }
        });

        // Convert BigInt fields to strings
        if (visitor && visitor.resetPasswordExpires) {
            visitor.resetPasswordExpires = visitor.resetPasswordExpires.toString();
        }

        res.json(visitor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports={updateVisitor,getVisitorById,getAllVisitors};