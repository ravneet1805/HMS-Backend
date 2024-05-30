const express = require("express");
const { signUp, signIn} = require("../controller/authController");

const auth = require('../middleware/auth');
const { validateSignup } = require("../middleware/validation");
const authRouter = express.Router();


authRouter.post("/signup",validateSignup, signUp)

authRouter.post("/signin", signIn)


module.exports = authRouter;