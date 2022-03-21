const mongoose = require("mongoose")
require('mongoose-type-email');
mongoose.SchemaTypes.Email.defaults.message = 'Email address is invalid'
const authorSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    title: {
        type: String,
        require:true,
        enum: ["Mr", "Mrs", "Miss"]
    },
    email:{
        type: mongoose.SchemaTypes.Email,
        require:true,
        unique:true},
    password: {
        type: String,
        required: true
    }
}, {timestamps: true});
module.exports = mongoose.model("Author", authorSchema);