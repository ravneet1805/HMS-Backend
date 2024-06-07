const express = require("express");
const { addSchedule, getDoctorAppointments, addPrescription, addTests } = require("../controller/doctorController");
const auth = require('../middleware/auth');
const doctorRouter = express.Router();

// add doctor schedule
doctorRouter.post("/addSchedule", auth.authenticate , auth.isDoctor, addSchedule);

doctorRouter.get("/appointments", auth.authenticate, auth.isDoctor, getDoctorAppointments)

doctorRouter.put('/prescription/:appointmentId', auth.authenticate , auth.isDoctor, addPrescription);

doctorRouter.put('/tests/:appointmentId', auth.authenticate , auth.isDoctor, addTests);


module.exports = doctorRouter;
