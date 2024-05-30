const express = require("express");
const {getDoctors} = require("../controller/adminController");

const auth = require('../middleware/auth');
const { validateSignup } = require("../middleware/validation");
const adminRouter = express.Router();


adminRouter.get("/all", getDoctors)



module.exports = adminRouter;