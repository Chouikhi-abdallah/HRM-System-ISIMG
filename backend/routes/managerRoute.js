const express = require('express');
const router = express.Router();
const {getAllManagers, getManagerById}= require('../controllers/mangerController');

// Routes
router.get('/all', getAllManagers);
router.get('/byid/:id', getManagerById);

module.exports = router;