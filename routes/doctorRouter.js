const express = require("express");
const { addSchedule, getDoctorAppointments } = require("../controller/doctorController");
const auth = require('../middleware/auth');
const doctorRouter = express.Router();

// add doctor schedule
doctorRouter.post("/addSchedule", auth.authenticate , auth.isDoctor, addSchedule);

doctorRouter.get("/appointments", auth.authenticate, auth.isDoctor, getDoctorAppointments)


module.exports = doctorRouter;
