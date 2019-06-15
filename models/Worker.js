const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workerSchema = new Schema({
    name: {
        type: String,
        required: true,
        lowercase: true
    },
    number: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        unique: true
    },
    available: {
        type: Boolean
    },
    dailyfullwage: {
        type: Number,
        required: true
    },
    Borrowed: [{
        message: {
            type: String,
        },
        date: {
            type: Date,
            default: Date.now
        },
        ammount: {
            type: Number,
            required: true
        }
    }],
    attendence: [Number]
});

module.exports = mongoose.model('worker', workerSchema);