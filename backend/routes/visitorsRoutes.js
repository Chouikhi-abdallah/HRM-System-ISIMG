const {updateVisitor,getVisitorById,getAllVisitors}= require('../controllers/visitorController');
const express = require('express');
const router = express.Router();
// Routes
router.get('/all', getAllVisitors);
router.put('/:id', updateVisitor);
router.get('/:id', getVisitorById);

module.exports = router;
