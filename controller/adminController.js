const { model } = require("mongoose");
const userModel = require("../model/user");



const getDoctors = async (req, res) =>  {
    console.log("ekrgfjsd")

    const list = await userModel.find({
        accountType : "doctor"
    });


    return res.json({
        success: true,
        data : list
    })

};

module.exports = { getDoctors };