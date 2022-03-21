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
        type:String,
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
