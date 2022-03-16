const mongoose = require("mongoose")
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Author"
    },
    tags: {
        type: [],
        default: []
    },
    category: {
        type: [],
        default: []
    },
    subcategory: {
        type: [],
        default: []
    },
    deletedAt: {
        type: String,
        default: " "
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    publishedAt: {
        type: String,
        default: " "
    },
    isPublished: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model("Blog", blogSchema);

/*const mongoose = require('mongoose');
const blogSchema = new mongoose.Schema( {
    title: {required:true},
    body: {mandatory}, 
    //authorId: {mandatory, refs to author model}, 
    tags:String, 
    category: {type:String,required:true},    
     // examples: [technology, entertainment, life style, food, fashion]}, 
    subcategory:{type:String,required:true},
    // {array of string, examples[technology-[web development, mobile development, AI, ML etc]] }, 
    createdAt: {timestamps: true },
    updatedAt: { timestamps: true },
    deletedAt: { timestamps: true }, 
    isDeleted: {type:boolean,default:false}, 
    publishedAt:{ timestamps: true },  
    isPublished: {type:boolean,default:false},
},
  { timestamps: true });


module.exports = mongoose.model('blogdetail', blogSchema)*/