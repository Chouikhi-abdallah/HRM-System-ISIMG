const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
// Import `getIo` to access `io`
const { getIo } = require('../socket');

const sendMessage = async (req, res) => {
  const { text, senderId, receiverId } = req.body;

  try {
    // Save the message to the database
    const newMessage = await prisma.Message.create({
      data: {
        text,
        senderId: parseInt(senderId, 10),
        receiverId: parseInt(receiverId, 10),
        status: 'sent',
      },
    });

    // Use `getIo` to access the `io` instance and emit the message to the specific receiver
    const io = getIo();
    io.to(receiverId).emit('receiveMessage', newMessage); // Send only to the intended receiver

    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send message' });
  }
};

const getMessagesBetweenUsers = async (req, res) => {
  const { senderId, receiverId } = req.query;
  if (!senderId || !receiverId) {
    return res.status(400).json({ error: 'Both senderId and receiverId are required' });
  }

  try {
    // Fetch the messages between the two users
    const messages = await prisma.message.findMany({
      where: {
        senderId: parseInt(senderId, 10),
        receiverId: parseInt(receiverId, 10),
      },
      orderBy: {
        timestamp: 'asc',
      },
    });

    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

module.exports = { sendMessage, getMessagesBetweenUsers };
