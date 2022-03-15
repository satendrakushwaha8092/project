const BlogsModel = require("../models/BlogsModel")
const AuthorModel = require("../models/AuthorModel")
const createBlog = async function (req, res) {
    try{
    let data = req.body
    let author_id = data.authorId
    if (!author_id) {
        return res.status(404).send("the request is not valid as the authorId details are required.")
    }
    let author = await AuthorModel.findById(author_id)
    if (!author) return res.status(404).send("the request is not valid as the no author is present with the giiven authr id")

    let savedData = await BlogsModel.create(data)
    res.status(201).send({ status: Boolean, msg: savedData })
}
catch (err) {
    console.log(err)
    res.status(500).send({ msg: err.message })
}
}

const getblogData = async function (req, res) {
    let allUsers = await BlogsModel.find().populate('authorId')
    res.status(200).send({ msg: allUsers })
}
const updatedblog = async function (req, res) {
    let userId = req.params.blogId;
    let user = await BlogsModel.findById(userId);
    //Return an error if no user with the given id exists in the db
    if (!user) {
        return res.send("No such user exists");
    }

    let userData = req.body;
    let updatedUser = await BlogsModel.findOneAndUpdate({ _id: userId }, userData, { new: true });
    res.status(200).send({ status: true, data: updatedUser });
};
const deleteblog = async function (req, res) {
    try{
    let userId = req.params.blogId;
    let user = await BlogsModel.findById(userId);
    //Return an error if no user with the given id exists in the db
    if (!user) {
        return res.send("No such user exists");
    }
    let deletedUser = await BlogsModel.findOneAndUpdate({ _id: userId }, {isDeleted:true}, { new: true });
    res.status(200).send({ status: true, data: deletedUser });
}
catch (err) {
    console.log(err)
    res.status(500).send({ msg: err.message })
}
};

const Deleteblog = async function (req, res) {
    try{
    let deletedUser = await BlogsModel.find({$or :[{ _id:req.quary.blogId },{category:req.quary.category}]},{isDeleted:true}, { new: true });
    res.status(200).send({ status: true, data: deletedUser });
}
catch (err) {
    console.log(err)
    res.status(500).send({ msg: err.message })
}
};

module.exports.createBlog = createBlog
module.exports.getblogData = getblogData
module.exports.updatedblog = updatedblog
module.exports.deleteblog=deleteblog
module.exports.Deleteblog=Deleteblog