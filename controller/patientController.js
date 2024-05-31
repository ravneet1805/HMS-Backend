const { model } = require("mongoose");
const userModel = require("../model/user");
const appointmentModel = require("../model/appointments")



const updateProfile = async (req, res) => {
    const patientId = req.user.id
    const { bloodGroup, weight, height } = req.body
    try {
        const patient = await userModel.findById(patientId);


        patient.bloodGroup = bloodGroup
        patient.weight = weight
        patient.height = height
        await patient.save();

        res.json({
            success: true,
            message: "Profile updated Successfully",
            data: patient
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

// Get all approved doctors
const getApprovedDoctors = async (req, res) => {
    try {
        const doctors = await userModel.find({ accountType: "doctor", approved: true });
        res.json({
            success: true,
            data: doctors
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Search for doctors
const searchDoctors = async (req, res) => {
    const { query } = req.params;
    try {
        const doctors = await userModel.find({
            accountType: "doctor",
            approved: true,
            $or: [
                { firstName: { $regex: query, $options: 'i' } },
                { lastName: { $regex: query, $options: 'i' } },
                { specialization: { $regex: query, $options: 'i' } }
            ]
        });
        res.json({
            success: true,
            data: doctors
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

const bookAppointment = async (req, res) => {
    const { doctorId, date, timeSlot, symptom } = req.body;
    const patientId = req.user.id;

    try {
        // Create a new appointment
        const appointment = new appointmentModel({
            patient: patientId,
            doctor: doctorId,
            date,
            timeSlot,
            symptom: symptom
        });
        await appointment.save();

        // Add the appointment reference to both patient and doctor
        await userModel.findByIdAndUpdate(patientId, { $push: { appointments: appointment._id } });
        await userModel.findByIdAndUpdate(doctorId, { $push: { appointments: appointment._id } });

        res.status(201).json({
            success: true,
            data: appointment
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Get appointments for the logged-in patient
const getPatientAppointments = async (req, res) => {
    const patientId = req.user.id;

    try {
        const appointments = await appointmentModel.find({ patient: patientId }).populate('doctor', 'firstName lastName specialization');
        res.json({
            success: true,
            data: appointments
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

module.exports = {
    getApprovedDoctors,
    searchDoctors,
    bookAppointment,
    getPatientAppointments,
    updateProfile
};