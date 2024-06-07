const mongoose = require("mongoose");

const userSchema = mongoose.Schema({

    accountType : {
        type : String,
        enum : ["patient", "doctor", "admin", "laboratory"],
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

    bloodGroup: {
        type: String,
        enum: ['A+','B+','A-','B-', 'AB+', 'AB-','O+', 'O-'],
    },

    weight: {
        type: Number
    },

    height: {
        type: Number
    },

    about : {
        type : String,
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

    schedule: [{
        date: {
            type: Date,
            required: true
        },
        slots: [{
            timeSlot: {
                type: String,
                enum: ['Morning', 'Afternoon', 'Evening'],
                required: true
            },
            startTime: {
                type: String,
                required: true
            },
            endTime: {
                type: String, // End time in HH:mm format (e.g., '12:00')
                required: true
            }
        }]
    }],

    appointments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Appointment"
        }
    ],

    
},{timestamps: true}
)

module.exports = mongoose.model("User", userSchema)