const { model } = require("mongoose");
const userModel = require("../model/user");


// get all doctors
const getDoctors = async (req, res) =>  {
    console.log("entered getDoctors block")

    const list = await userModel.find({
        accountType : "doctor"
    });


    return res.json({
        success: true,
        data : list
    })

};

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

module.exports = { getDoctors, approveDoctor, deleteDoctor };
