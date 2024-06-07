const userModel = require("../model/user");
const labTestModel = require("../model/labTestAppointment")



// Get lab test appointments for the logged-in patient
const getLabTestAppointments = async (req, res) => {


    try {
        const labTestAppointments = await labTestModel.find()
        res.json({
            success: true,
            data: labTestAppointments
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};


module.exports = {
    getLabTestAppointments
}