const mongoose = require("mongoose");

const userSchema = mongoose.Schema({

    accountType : {
        type : String,
        enum : ["patient", "doctor", "admin"],
        required : true

    },

    firstName : {
        type : String,
        required : true
    },

    lastName : {
        type : String,
        required : true
    },

    age : {
        type : Number,
        required : true
    },
    gender : {
        type : String,
        enum: ["Male", "Female", "Other"],
        required : true
    },
    phoneNumber : {
        type : Number,
        required : true
    },
    approved: {
        type: Boolean,
        default: false
    },

    email : {
        type : String,
        required : true
    },

    password : {
        type : String,
        required : true
    },
    specialization : {
        type : String
    },

    experience : {
        type : String
    },

    qualification : {
        type : String
    },

    appointments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],

    
},{timestamps: true}
)

module.exports = mongoose.model("User", userSchema)