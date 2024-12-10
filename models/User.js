const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, },
    surname: { type: String, required: true, },
    email: { required: true, type: String, unique: true, },
    password: { type: String, required: true, },
    birthday: { type: Date, required: true, },
    age: { type: Number, required: true, },
});

module.exports = mongoose.model('User', userSchema);