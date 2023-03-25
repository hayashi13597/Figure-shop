const express = require("express");
const router = express.Router();

const User = require("../models/User");
const verifyToken = require('../middleware/auth');

const userController = require('../controller/userController');

const connectDB = require('../config/connectDB');
connectDB();

// @Route GET /api/auth
// @desc Check if user is logged in
// @access public
router.get('/', verifyToken, userController.loggedIn)


// @Route POST /api/auth/register
// @desc Register user
// @access public
router.post("/register", userController.registerUser);

// @Route POST /api/auth/login
// @desc Login user
// @access public
router.post('/login', userController.login);

module.exports = router;
