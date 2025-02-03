const express=require('express')
const router=express.Router()
const {sendMessage,getMessagesBetweenUsers}=require('../controllers/messageController')

router.post('/sendMessage',sendMessage);
router.get('/fetch',getMessagesBetweenUsers);

module.exports=router;
