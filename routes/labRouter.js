const express = require("express");
const { getLabTestAppointments } = require("../controller/labController");
const auth = require('../middleware/auth');
const labRouter = express.Router();


labRouter.get("/allappointments", auth.authenticate , auth.isLaboratory, getLabTestAppointments)

module.exports = labRouter