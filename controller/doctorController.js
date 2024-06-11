const appointments = require('../model/appointments');
const userModel = require('../model/user');
const appointmentModel = require('../model/appointments')


// add doctor's schedule
const addSchedule = async (req, res) => {
    try {
        const doctorId = req.user.id;
        const { schedule } = req.body;

        // Find the doctor by userId
        const doctor = await userModel.findById(doctorId);

        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        // Validate schedule format
        if (!Array.isArray(schedule)
            //|| schedule.length !== 6
    ) {
            return res.status(400).json({ message: 'Invalid schedule format. Expected an array of 6 items.' });
        }

        // Update doctor's schedule
        doctor.schedule = schedule;
        await doctor.save();

        res.status(200).json({ message: 'Schedule added successfully', doctor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get appointments for the logged-in doctor
const getDoctorAppointments = async (req, res) => {
    const doctorId = req.user.id;

    try {
        const appointments = await appointmentModel.find({ doctor: doctorId }).populate('patient', 'firstName lastName age gender');
        res.json({
            success: true,
            data: appointments
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

//update patient's appointment to write prescription
const addPrescription = async (req, res) => {
    const { appointmentId } = req.params;
    const { prescription } = req.body;



    try {
        
        const appointment = await appointmentModel.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ success: false, message: 'Appointment not found' });
        }
        console.log("appointment: "+appointment)

        appointment.prescription = prescription;
        appointment.status = 'Completed';
        await appointment.save();

        res.json({ success: true, appointment });
    } catch (error) {
        console.error("Error adding prescription:", error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

const addTests = async (req, res) => {
    const { appointmentId } = req.params;
    const { tests } = req.body;

    try {
        const appointment = await appointmentModel.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ success: false, message: 'Appointment not found' });
        }

        appointment.tests = tests;
        await appointment.save();

        res.json({ success: true, appointment });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error });
    }
};

const getProfile = async (req, res) => {
    try {
        const doctorId = req.user.id;

        const doctor = await userModel.findById(doctorId);

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: 'Doctor not found'
            });
        }

        res.status(200).json({
            success: true,
            data: doctor
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
}




module.exports = { addSchedule, getDoctorAppointments, addPrescription, addTests, getProfile}
