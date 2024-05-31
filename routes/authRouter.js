const express = require("express");
const { signUp, signIn} = require("../controller/authController");

const auth = require('../middleware/auth');
const { validateSignup } = require("../middleware/validation");
const authRouter = express.Router();

//signup user
authRouter.post("/signup",validateSignup, signUp)

//signin user
authRouter.post("/signin", signIn)


module.exports = authRouter;