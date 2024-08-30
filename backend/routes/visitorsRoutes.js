const {updateVisitor,getVisitorById}= require('../controllers/visitorController');
const express = require('express');
const router = express.Router();
// Routes
router.put('/:id', updateVisitor);
router.get('/:id', getVisitorById);
module.exports = router;
