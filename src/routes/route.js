const express = require('express');
const router = express.Router();
const authorController= require("../Controllers/authorController")
const blogController= require("../Controllers/blogController")


router.post("/createauthors", authorController.createAuthor)

router.post("/createblogs", blogController.createBlog)

router.get("/getauthorsData", authorController.getauthorData)

router.get("/getblogsData", blogController.getblogData)

router.put("/blogs/:blogId", blogController.updatedblog)

router.delete("/blogs/:blogId", blogController.deleteblog)

router.delete("/blogs", blogController.Deleteblog)

module.exports = router;