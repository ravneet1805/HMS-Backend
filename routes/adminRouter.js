const express = require("express");
const {getDoctors, approveDoctor, deleteDoctor, getPatients, getEmergencyList} = require("../controller/adminController");
const auth = require('../middleware/auth');
const adminRouter = express.Router();

//get all doctor requests
adminRouter.get("/doctors", auth.authenticate , auth.isAdmin, getDoctors)

adminRouter.get("/patients", auth.authenticate , auth.isAdmin, getPatients)

//approve doctor request
adminRouter.put("/doctors/:doctorId/approve", auth.authenticate , auth.isAdmin, approveDoctor);

//reject doctor request and it will get deleted from the DB
adminRouter.delete("/doctors/:doctorId", auth.authenticate , auth.isAdmin, deleteDoctor);

//get emergency list
adminRouter.get("/emergency", auth.authenticate , auth.isAdmin, getEmergencyList);



module.exports = adminRouter;