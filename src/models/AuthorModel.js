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
        enum: ["Mr", "Mrs", "Miss"]
    },
    email:{type: mongoose.SchemaTypes.Email},
    password: {
        type: String,
        required: true
    }
}, {timestamps: true});
module.exports = mongoose.model("Author", authorSchema);

/*const mongoose = require('mongoose');
const authorSchema = new mongoose.Schema( {
    fname: {type:String,required:true}, 
    lname: {type:String,required:true}, 
    title: {required:true, enum:["Mr", "Mrs", "Miss"]}, 
    email: {required:true, unique:true}, 
    password: {required:true} 
} ,
  { timestamps: true });


module.exports = mongoose.model('Authordetail', authorSchema)*/