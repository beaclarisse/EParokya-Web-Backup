const mongoose = require('mongoose');

const counselingSchema = new mongoose.Schema({

    person: {
        fullName: { type: String, required: false },
        dateOfBirth: { type: Date, required: false },
    },

    visitType: { type: String, enum: ['Simbahan', 'Bahay'], required: false },

    address: {
        block: { type: String, required: true },
        street: { type: Date, required: true },
        phase: { type: String, required: true },
        baranggay: { type: String, required: true },
    },

    counselingDate: { type: Date, required: false },
    counselingTime: { type: String, required: false, },

    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    confirmedAt: {
        type: Date,
    },

    counselingStatus: {
        type: String,
        required: false,
        default: 'Pending',
        enum: ['Pending', 'Confirmed', 'Cancelled'],
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },

    comments: [
    {
        priest: String,
        scheduledDate: Date,
        selectedComment: String,
        additionalComment: String,
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
],

priest: { type: String, required: false },

});

module.exports = mongoose.model('Baptism', BaptismSchema);