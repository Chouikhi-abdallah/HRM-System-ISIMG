const { signup } = require("../controllers/authController");
const { login } = require("../controllers/authController");

const express = require("express");
const router = express.Router();

// creating routes for signup and login to be used in main index.js

// Routes
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;