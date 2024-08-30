const { signup } = require("../controllers/authController");
const { login } = require("../controllers/authController");

const {forgetPassword}=require('../controllers/authController');

const {resetPassword}=require('../controllers/authController');

const express = require("express");
const router = express.Router();

// creating routes for signup and login to be used in main index.js

// Routes
router.post("/signup", signup);

router.post("/login", login);
router.post('/forgetpassword', forgetPassword);
router.post('/resetpassword', resetPassword);


module.exports = router;