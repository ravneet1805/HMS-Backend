const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    symptom: {
        type: String,
        required: true
    },

    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    timeSlot: {
        type: String,
        enum: ['Morning', 'Afternoon', 'Evening'],
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed'],
        default: 'Pending'
    },
    prescription: {
        type: String,
        default:"",
    },
    tests: [{
        testName: String,
        result: String
    }]
    
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
