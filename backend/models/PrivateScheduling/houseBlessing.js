const mongoose = require('mongoose');

const houseBlessingSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    contactNumber: { type: String, required: true },
    address: {
        houseDetails: { type: Date, required: true },
        block: { type: String, required: false },
        lot: { type: String, required: false },
        phase: { type: Date, required: true },
        baranggay: { type: Date, required: true },
        district: { type: Date, required: true },
        city: { type: Date, required: true },
    },
    blesssingDate: { type: Date, required: true },
    blessingTime: { type: String, required: true, },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    confirmedAt: {
        type: Date,
    },

    blessingStatus: {
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

module.exports = mongoose.model('houseBlessing', houseBlessingSchema);