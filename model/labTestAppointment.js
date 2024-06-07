const mongoose = require('mongoose');

const labTestAppointmentSchema = new mongoose.Schema({
    patient: {
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
    testName: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed', 'Cancelled'],
        default: 'Pending'
    }
}, { timestamps: true });

module.exports = mongoose.model('LabTestAppointment', labTestAppointmentSchema);
