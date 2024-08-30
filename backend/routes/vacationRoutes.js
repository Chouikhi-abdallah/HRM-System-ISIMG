const {changeStatus, createRequest}=require('../controllers/vacationController');
const express=require('express');
const router=express.Router();

router.post('/createRequest',createRequest);
router.put('/changeStatus',changeStatus);

module.exports=router;