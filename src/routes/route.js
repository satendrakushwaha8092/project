const express = require('express');
const router = express.Router();
const authorController = require("../Controllers/authorController")
const blogController = require("../Controllers/blogController")
const middleware = require("../middleware/auth")
/*
//phase-1
router.post("/authors", authorController.createAuthor)  //create author

router.get("/authors", authorController.getauthorData)  //get all authrs detail

 router.post("/blogs", blogController.createBlog)   //create blog

 router.get("/blogs", blogController.getblogData)  //get all blogs data by using filter

 router.put("/blogs/:blogId", blogController.updatedblog)  //updating blog by body param

 router.delete("/blogs/:blogId", blogController.deleteblog)  //delete blog by body param

 router.delete("/blogs", blogController.Deleteblog)  //delete blog by query params
*/
//phase-2

router.post("/authors", authorController.createAuthor)  //create authors detail

router.post("/login", blogController.login)   //auther is logit

router.post("/blogs", middleware.authenticate, blogController.createBlog)   //create blogs

router.put("/blogs/:blogId", middleware.authenticate, middleware.authorise, blogController.updatedblog)   //update blogs by body params

router.get("/blogs", middleware.authenticate, blogController.getblogData)  //get all authors  detail

router.delete("/blogs/:blogId", middleware.authenticate, middleware.authorise, blogController.deleteblog)  //delete blogs by body params

router.delete("/blogs", middleware.authenticate, middleware.authorise, blogController.Deleteblog)  //delete blogs by query params

module.exports = router;