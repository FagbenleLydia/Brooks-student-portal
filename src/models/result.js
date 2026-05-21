const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    studentID: {type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true},
    course: {type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true},
    teacher: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    score: {type: Number, required: true, min: 0, max: 100},
    grade: {type: String},
    level: {
        type: String,
        enum: ['100','200','300','400','500','600','Spill-Over'],
        required: true,
        trim: true
    },
    semester: {type: String, enum: ['first','second'], required: true, trim: true}
}, {timestamps: true, versionKey: false});

module.exports = mongoose.model('Result', resultSchema);