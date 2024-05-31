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


module.exports = { addSchedule, getDoctorAppointments }
