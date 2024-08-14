const { signup } = require("../controllers/authController");
const { login } = require("../controllers/authController");

const express = require("express");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;