const express = require("express");
const { getApprovedDoctors, searchDoctors, bookAppointment, getPatientAppointments, updateProfile, createEmergencyRequest } = require("../controller/patientController");
const auth = require('../middleware/auth');
const patientRouter = express.Router();

// Get all approved doctors
patientRouter.get("/doctors", auth.authenticate , auth.isPatient, getApprovedDoctors)

// Search for doctors
patientRouter.get("/doctors/search/:query", auth.authenticate , auth.isPatient, searchDoctors)

patientRouter.post("/bookappointment", auth.authenticate, auth.isPatient, bookAppointment)

patientRouter.get("/appointments", auth.authenticate, auth.isPatient, getPatientAppointments)

patientRouter.put("/update", auth.authenticate, auth.isPatient, updateProfile)

patientRouter.post("/emergency", auth.authenticate, auth.isPatient, createEmergencyRequest)

module.exports = patientRouter;
