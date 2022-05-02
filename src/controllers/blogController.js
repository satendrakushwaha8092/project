const mongoose = require("mongoose")
const BlogsModel = require("../models/BlogsModel")
const AuthorModel = require("../models/AuthorModel")
const jwt = require("jsonwebtoken")

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}

const isValidData = function (value) {
    if (typeof (value) === "string" && (value).trim().length === 0) return false
    return true
}

const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
}

const createBlog = async function (req, res) {    //In this block to create author data
    try {
        let data = req.body

        if (Object.keys(data).length == 0) return res.status(400).send({
            status: false,
            msg: "requst body is empty"
        })

        if (!isValid(data.title)) return res.status(400).send({
            status: false,
            msg: "title is required"
        })

        if (!isValid(data.body)) return res.status(400).send({
            status: false,
            msg: "body is required"
        })

        if (!isValid(data.authorId)) return res.status(400).send({
            status: false,
            msg: "authorid is required"
        })

        if (!isValidObjectId(data.authorId)) {
            return res.status(400).send({
                status: false,
                msg: "authorid is invalid"
            })
        }

        if (!await AuthorModel.findOne({ _id: data.authorId })) {
            return res.status(400).send({
                status: false,
                msg: "authorid is not present"
            })
        }

        if (data.isPublished == true) {
            await BlogsModel.findOneAndUpdate({ _id: userId }, { publishedAt: new Date() }, { new: true });
        }

        //let token = req.headers['x-api-key'];
        //let decodedToken = jwt.verify(token, 'functionup-thorium')

        // if (data.authorId != decodedToken.userId) return res.status(406).send({
        //     status: false,
        //     msg:"enter valid blogId"
        // })

        let savedData = await BlogsModel.create(data)
        res.status(201).send({
            status: Boolean,
            msg: savedData
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ status: false, msg: err.message })
    }
}

const login = async function (req, res) {    //author can login this block
    try {
        let userId = req.body.email;
        let password = req.body.password;

        if (Object.keys(req.body).length == 0) return res.status(400).send({
            status: false,
            msg: "userId and password is required"
        })

        if (!isValid(userId)) return res.status(400).send({
            status: false,
            msg: "userId is required"
        })

        if (!/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/.test(data.email)) {
            return res.status(400).send({
                status: false,
                msg: "userId is not valid"
            })
        }

        if (!isValid(password)) return res.status(400).send({
            status: false,
            msg: "password is required"
        })

        let user = await AuthorModel.findOne({ email: userId, password: password });

        if (!user)
            return res.send({
                status: false,
                msg: "username or the password is not corerct",
            })
        else {
            let token = jwt.sign(
                {
                    userId: user._id
                },
                "project1"
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

const getblogData = async function (req, res) {
    try {
        const data = req.query
        const filter = {
            isDeleted: false,
            isPublished: true,
            ...data
        }
        if (Object.keys(data).length == 0) return res.status(400).send({
            status: false,
            msg: "please enter query filter"
        })

        let allblogs = await BlogsModel.find(filter)
        res.status(200).send({ status: false, data: allblogs })
    } catch (e) {
        res.status(404).send({ status: false, msg: e.message })
    }
}
const updatedblog = async function (req, res) {    //in this block author can update blog
    try {
        let blogId = req.params.blogId
        let author = await BlogsModel.findById(blogId);

        if (!isValidObjectId(blogId)) {
            return res.status(400).send({
                status: false,
                msg: "blogid is invalid"
            })
        }

        if (!await BlogsModel.findOne({ _id: blogId, isDeleted: false })) {
            return res.status(400).send({
                status: false,
                msg: "blogid is not present"
            })
        }

        let authorData = req.body;

        if (Object.keys(authorData).length == 0) return res.status(400).send({
            status: false,
            msg: "requst body is empty"
        })

        if (!isValidData(authorData.title)) {
            return res.status(400).send({
                status: false,
                Message: "title is required"
            })
        }

        if (!isValidData(authorData.body)) {
            return res.status(400).send({
                status: false,
                Message: "body is required"
            })
        }

        if (!isValidData(authorData.authorId)) {
            return res.status(400).send({
                status: false,
                Message: "authorId is required"
            })
        }
        if (authorData.authorId) {
            if (!isValidObjectId(authorData.authorId)) {
                return res.status(400).send({
                    status: false,
                    msg: "authorId is invalid"
                })
            }

            if (!await AuthorModel.findOne({ _id: authorData.authorId })) {
                return res.status(400).send({
                    status: false,
                    msg: "authorid is not present"
                })
            }
        }

            if (!isValidData(authorData.tages.length==0)) {
                return res.status(400).send({
                    status: false,
                    Message: "tages is required"
                })
            }

            if (!isValidData(authorData.category)) {
                return res.status(400).send({
                    status: false,
                    Message: "category is required"
                })
            }

            if (!isValidData(authorData.subcategory.length==0)) {
                return res.status(400).send({
                    status: false,
                    Message: "subcategory is required"
                })
            }

        if (Object.hasOwn(authorData, authorData.title)) {
            if (ObjectValues(authorData, title).length == 0) return res.status(400).send({ status: false, data: "title is required" });

        }
        await BlogsModel.findOneAndUpdate({ _id: blogId }, authorData, { new: true });
        let updatedblog = await BlogsModel.findOneAndUpdate({ _id: blogId }, { $set: { publishedAt: new Date(), new: true } });


        res.status(200).send({ status: true, data: updatedblog });
    }
    catch (e) {
        res.status(404).send({ status: false, msg: e.message })
    }
}
const deleteblog = async function (req, res) {   //in this block accept request params
    try {
        let blogId = req.params.blogId

        if (!isValidObjectId(blogId)) {
            return res.status(400).send({
                status: false,
                msg: "blogid is invalid"
            })
        }

        if (!await BlogsModel.findOne({ _id: blogId, isDeleted: false })) {
            return res.status(400).send({
                status: false,
                msg: "blogid is not present"
            })
        }
        let deletedblog = await BlogsModel.findOneAndUpdate({ _id: blogId }, { isDeleted: true, deletedAt: new Date() }, { new: true });
        res.status(200).send({
            status: true,
            data: deletedblog
        });
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ status: false, msg: err.message })
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
            return res.status(404).send({ status: false, msg: "No such user exists" });
        }
        let deletedUser = await BlogsModel.findOneAndUpdate({ _id: user._id }, { isDeleted: true, deletedAt: new Date() }, { new: true });
        res.status(200).send({
            status: true,
            data: deletedUser
        });
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports.createBlog = createBlog
module.exports.getblogData = getblogData
module.exports.updatedblog = updatedblog
module.exports.deleteblog = deleteblog
module.exports.Deleteblog = Deleteblog
module.exports.login = login