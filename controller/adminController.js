const { model } = require("mongoose");
const userModel = require("../model/user");
const emergencyModel = require("../model/emergencies")


// get all doctors
const getDoctors = async (req, res) =>  {
    console.log("entered getDoctors block")

    const list = await userModel.find({
        accountType : "doctor"
    }).populate('appointments');


    return res.json({
        success: true,
        data : list
    })

};

//get all patients
const getPatients = async (req, res) => {
    try {

        const list = await userModel.find({
            accountType : "patient"
        }).populate('appointments')
    
        return res.json({
            success: true,
            data: list
        })
        

    } catch (error) {
        res.status(500).json({success: false,
            message:error
        })
    }
}

// Approve doctor
const approveDoctor = async (req, res) => {
    const { doctorId } = req.params;
    try {
        const doctor = await userModel.findById(doctorId);
        if (!doctor || doctor.accountType !== "doctor") {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }

        doctor.approved = true;
        await doctor.save();

        res.json({
            success: true,
            message: "Doctor approved successfully",
            data: doctor
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Delete doctor
const deleteDoctor = async (req, res) => {
    const { doctorId } = req.params;
    try {
        const doctor = await userModel.findByIdAndDelete(doctorId);
        if (!doctor || doctor.accountType !== "doctor") {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }

        res.json({
            success: true,
            message: "Doctor deleted successfully"
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Get all emergency requests
const getEmergencyList = async (req, res) => {
    try {
        const emergencyRequests = await emergencyModel.find().populate('patient');
        res.status(200).json({ success: true, emergencyRequests });
    } catch (error) {
        console.error("Error fetching emergency requests:", error); // Log the error to the console
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

module.exports = { getDoctors, approveDoctor, deleteDoctor, getPatients, getEmergencyList };
