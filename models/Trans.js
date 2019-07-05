const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transSchema = new Schema({
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
    attendence: [{
        date: {
            type: Number,
            default: Date.now
        },
        lastUpdated: {
            type: Number,
            default: Date.now
        },
        points: {
            type: Number,
            required: true,
            max: 2,
            min: 0
        }
    }],
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

transSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.updateAt = this.meta.createAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
    next();
});

module.exports = mongoose.model('tran', transSchema);