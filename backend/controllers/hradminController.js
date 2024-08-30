const {PrismaClient} = require('@prisma/client'); 
const prisma = new PrismaClient();

const getHrAdmins = async (req, res) => {
    try {
        const hrAdmins = await prisma.hRAdmin.findMany({
            include: {
                visitor: true, // Assuming you want to display their names
            },
        });
        res.status(200).json(hrAdmins);
    } catch (error) {
        console.error('Error fetching HR admins:', error);
        res.status(500).json({ error: 'Could not fetch HR admins' });
    }
};

module.exports={getHrAdmins};