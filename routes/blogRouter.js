const express = require("express");
const generalBlogRouter = express.Router();
const blogRouter = express.Router();
const {
  createBlog,
  getPublishedBlogs,
  updateBlog,
  deleteBlog,
  singleBlog,
  myBlogs,
} = require("../controller/blogPost");

// not logged in users routes
generalBlogRouter.route("/").get(getPublishedBlogs);

generalBlogRouter.route("/:id").get(singleBlog);

//logged in users routes

blogRouter.route('/create').post(createBlog)

blogRouter.route("/published").get(getPublishedBlogs);

blogRouter.route("/published/:id").get(singleBlog)

blogRouter.route('/all').get(myBlogs)

blogRouter.route("/all/:id").get(singleBlog).patch(updateBlog).delete(deleteBlog);

module.exports = { generalBlogRouter, blogRouter };
