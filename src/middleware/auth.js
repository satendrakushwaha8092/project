const jwt = require("jsonwebtoken")
const BlogsModel = require("../models/BlogsModel");

const authenticate = function (req, res, next) {
    try{
    let token = req.headers['x-api-key'];
    if (!token) token = req.headers["x-api-key"];
    if (!token) return res.status(404).send({ status: false, msg: "token must be present" });
    console.log(token);
    next()
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

const authorise = async function (req, res, next) {
    try{
    let token = req.headers['x-api-key'];
    let decodedToken = jwt.verify(token, 'functionup-thorium')
    if (!decodedToken) return res.staus(404).send({ status: false, msg: "token is not valid" })

    let userToBeModified = req.params.blogId
    
    let blog = await BlogsModel.findById(userToBeModified)
    if (!blog) return res.status(404).send({ status: false, msg: 'No such user exists' })

    let authorid = blog.authorId
    let userLoggedIn = decodedToken.userId
    if (authorid != userLoggedIn) return res.status(400).send({ status: false, msg: 'User logged is not allowed to modify the requested users data' })

    next()
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

module.exports.authenticate = authenticate
module.exports.authorise = authorise;