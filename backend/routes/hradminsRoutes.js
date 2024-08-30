const {getHrAdmins}=require('../controllers/hradminController');

const express=require('express');
const router=express.Router();

router.get('/all',getHrAdmins);

module.exports=router;