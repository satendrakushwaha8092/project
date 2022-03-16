const express = require('express');
const router = express.Router();
const authorController= require("../Controllers/authorController")
const blogController= require("../Controllers/blogController")
const middleware= require("../middleware/auth")

//phase-1

router.post("/createauthors", authorController.createAuthor)

router.post("/createblogs", blogController.createBlog)

router.get("/getauthorsData", authorController.getauthorData)

router.get("/getblogsData", blogController.getblogData)

router.put("/blogs/:blogId", blogController.updatedblog)

router.delete("/blogs/:blogId", blogController.deleteblog)

router.delete("/blogs", blogController.Deleteblog)

//phase-2

router.post("/login",blogController.login)

router.post("/createblog",middleware.authenticate,blogController.createBlog)

router.put("/editblog/:blogId",middleware.authenticate,middleware.authorise,blogController.updatedblog)

router.get("/getlistblog",middleware.authenticate,blogController.getblogData)

router.delete("/deleteblog/:blogId",middleware.authenticate,middleware.authorise,blogController.deleteblog)

module.exports = router;