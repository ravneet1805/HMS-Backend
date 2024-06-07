const userModel = require("../model/user");
const appointmentModel = require("../model/appointments")
const emergencyModel = require("../model/emergencies")
const labTestModel = require("../model/labTestAppointment")



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

// Create an emergency request
const createEmergencyRequest = async (req, res) => {
    const { description } = req.body;
    const patientId = req.user.id;

    try {
        const emergencyRequest = new emergencyModel({
            patient: patientId,
            description
        });
        await emergencyRequest.save();

        res.status(201).json({ success: true, emergencyRequest });
    } catch (error) {
        console.error("Error creating emergency request:", error); // Log the error to the console
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

//book lab tests
const bookLabTestAppointment = async (req, res) => {
    const { date, timeSlot, testName } = req.body;
    const patientId = req.user.id;

    try {
        console.log(patientId)
        const labTestAppointment = new labTestModel({
            patient: patientId,
            date,
            timeSlot,
            testName
        });
        await labTestAppointment.save();

        // Add the appointment reference to both patient
        await userModel.findByIdAndUpdate(patientId, { $push: { labTestAppointments: labTestAppointment._id } });

        res.status(201).json({
            success: true,
            data: labTestAppointment
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

const cancelLabTestAppointment = async (req, res) => {
    const {appointmentId} = req.params
    console.log(appointmentId)

    try {
        
        const labTestAppointment = await labTestModel.findById(appointmentId);
        console.log("found appointment: "+labTestAppointment)
        if (!labTestAppointment) {
            return res.status(404).json({ success: false, message: 'Appointment not found' });
        }


        labTestAppointment.status = 'Cancelled';
        await labTestAppointment.save();

        res.json({ success: true, labTestAppointment });

    } catch (error) {
        console.error("Error cancelling prescription:", error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
}

module.exports = {
    getApprovedDoctors,
    searchDoctors,
    bookAppointment,
    getPatientAppointments,
    updateProfile,
    createEmergencyRequest,
    bookLabTestAppointment,
    cancelLabTestAppointment
};