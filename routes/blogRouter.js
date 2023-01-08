const express = require("express");
const generalBlogRouter = express.Router();
const blogRouter = express.Router();
const {addBlogPostValidationMiddleware, updateBlogPostValidationMiddleware} = require('../validation/blogPost.validation')
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

blogRouter.route("/create").post(addBlogPostValidationMiddleware,createBlog);

blogRouter.route("/published").get(getPublishedBlogs);

blogRouter
  .route("/published/:id")
  .get(singleBlog)
  .patch(updateBlogPostValidationMiddleware,updateBlog)
  .delete(deleteBlog);

blogRouter.route("/all").get(myBlogs);

blogRouter
  .route("/all/:id")
  .get(singleBlog)
  .patch(updateBlogPostValidationMiddleware,updateBlog)
  .delete(deleteBlog);

module.exports = { generalBlogRouter, blogRouter };
