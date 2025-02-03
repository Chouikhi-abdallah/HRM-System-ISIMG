const {getAll,createTraining,updateTraining,all,deleteTraining}=require('../controllers/trainingController');
const express=require('express');
const router=express.Router();

router.post('/createTraining',createTraining);
router.get('/all/:hrAdminId',getAll)
router.get('/alltraing',all)
router.delete('/deleteTraining',deleteTraining);
router.put('/updateTraining',updateTraining);

module.exports=router;
