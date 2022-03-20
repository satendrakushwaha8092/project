const BlogsModel = require("../models/BlogsModel")
const AuthorModel = require("../models/AuthorModel")
const moment = require("moment")
const jwt = require("jsonwebtoken")
const { updateOne } = require("../models/BlogsModel")

const createBlog = async function (req, res) {    //In this block to create author data
    try {
        let data = req.body
        if (data.isPublished == true) {
            await BlogsModel.findOneAndUpdate({ _id: userId }, { publishedAt:new Date() }, { new: true });
        }
        let token = req.headers['x-api-key'];
        let decodedToken = jwt.verify(token, 'functionup-thorium')
        if(data.authorId!=decodedToken.userId) return res.status(406).send("enter valid authorId")

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
    try {
        const data = req.query
        const filter = {
            isDeleted: false,
            isPublished: true,
            ...data
        }
        if (Object.keys(data).length == 0) return res.status(203).send("please enter query filter")
        let blog = await BlogsModel.findOne(filter)
        if (!blog) return res.send("data is not available")
        let allUsers = await BlogsModel.findOne(filter).populate('authorId')
        res.status(200).send({ msg: allUsers })
    } catch (e) {
        res.status(404).send({ status: false, msg: e.message })
    }
}
const updatedblog = async function (req, res) {    //in this block author can update blog
    try {
        let userId = req.params.blogId;
        let user = await BlogsModel.findById(userId);

        if (!user) {
            return res.send("No such user exists");
        }
        if (user.isDeleted == false) {
            let userData = req.body;
            if (userData.isPublished == true) {
                await BlogsModel.findOneAndUpdate({ _id: userId }, { publishedAt:new Date() }, { new: true });
            }
            let updatedUser = await BlogsModel.findOneAndUpdate({ _id: userId }, userData, { new: true });

            res.status(200).send({ status: true, data: updatedUser });
        }
        else {
            res.status(404).send("data is not available")
        }
    }
    catch (e) {
        res.status(404).send({ status: false, msg: e.message })
    }
};
const deleteblog = async function (req, res) {   //in this block accept request params
    try {
        let userId = req.params.blogId;
        let user = await BlogsModel.findById(userId);

        if (!user) {
            return res.send("No such user exists");
        }
        let deletedUser = await BlogsModel.findOneAndUpdate({ _id: userId }, { isDeleted: false, deletedAt: moment().format() }, { new: true });
        res.status(200).send({ status: true, data: deletedUser });
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
};

const Deleteblog = async function (req, res) {   //in thisn block accpt query params
    try {
        const data = req.query
        const filter = {
            isDeleted: false,
            isPublished: true,
            ...data
        }
        let user = await BlogsModel.findOne(filter);
        if (!user) {
            return res.status(404).send("No such user exists");
        }
        let deletedUser = await BlogsModel.findOneAndUpdate({ _id: user._id }, { isDeleted: true, deletedAt: moment().format() }, { new: true });
        res.status(200).send({ status: true, data: deletedUser });
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
};

const login = async function (req, res) {    //author can login this block
    try {
        let userId = req.body.email;
        let password = req.body.password;

        let user = await AuthorModel.findOne({ email: userId, password: password });
        console.log(user)
        if (!user)
            return res.send({
                status: false,
                msg: "username or the password is not corerct",
            })
        else {
            let token = jwt.sign(
                {
                    userId: user._id.toString(),
                    batch: "thorium",
                    organisation: "FUnctionUp",
                },
                "functionup-thorium"
            );
            res.setHeader("x-api-key", token);
            res.status(200).send({ status: true, data: token });
        };
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

module.exports.createBlog = createBlog
module.exports.getblogData = getblogData
module.exports.updatedblog = updatedblog
module.exports.deleteblog = deleteblog
module.exports.Deleteblog = Deleteblog
module.exports.login = login