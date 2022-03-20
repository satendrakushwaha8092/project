const jwt = require("jsonwebtoken")
const BlogsModel = require("../models/BlogsModel");


const authenticate = function (req, res, next) {
    try {
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
    const data = req.params
    let blog
    if (Object.keys(data).length == 0) {
        const data = req.query
         blog = await BlogsModel.findOne(data)
        if (!blog) return res.status(400).send("blog is not found")
    }
    else {
         blog = await BlogsModel.findById(data.blogId)
        if (!blog) return res.status(400).send("blog is not found")
    }

    try {
        let token = req.headers['x-api-key'];
        let decodedToken = jwt.verify(token, 'functionup-thorium')

        //console.log(decodedToken.userId)
        if (!decodedToken) return res.staus(404).send({ status: false, msg: "token is not valid" })
        if (decodedToken.userId != blog.authorId) return res.status(400).send({ status: false, msg: 'User logged is not allowed to modify the requested users data' })

        next()
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}



module.exports.authenticate = authenticate
module.exports.authorise = authorise;