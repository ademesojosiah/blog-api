const { blogPostModel } = require("../model");
const { UnAuthorisedError, BadRequest } = require("../errors");

const createBlog = async (req, res, next) => {
  try {
    const {
      user: { fullname, user_id },
      body,
    } = req;
    body.author = fullname;
    body.createdBy = user_id;
    const blog = await blogPostModel.create({ ...body });
    res.status(200).json({ status: true, blog });
  } catch (error) {
    next(error);
  }
};

const getPublishedBlogs = async (req, res, next) => {
  try {
    const queryObject = {}
    queryObject.state = 'Published'
    const blogs = await blogPostModel.find(queryObject);
    res.status(200).json({ status: true, blogs });
  } catch (error) {
    next(error);
  }
};

const getAllBlogs = async(req,rees,next)=>{
    try {
        const blogs = await blogPostModel.find();
        res.status(200).json({ status: true, blogs });
      } catch (error) {
        next(error);
      }
}

const myBlogs = async (req, res, next) => {
  try {
    const { user_id } = req.user;
    const blog = await blogPostModel.find({ createdBy: user_id });
    if(!blog){
        throw new UnAuthorisedError(`no Blog post created yet`)
    }
    res.status(200).json({ status: true, blog });
  } catch (error) {
    next(error);
  }
};

const singleBlog = async (req, res, next) => {
  const { id: blogId } = req.params;
  try {
    const blog = await blogPostModel.findOne({ _id: blogId });
    if (!blog) throw new BadRequest(`no blog post with id:${blogId}`);
    res.status(200).json({ status: true, blog });
  } catch (error) {
    next(error);
  }
};

const updateBlog = async (req, res, next) => {
  const {
    user: { user_id },
    body,
  } = req;
  const { id: blogId } = req.params;
  try {
    const blog = await blogPostModel.findOneAndUpdate(
      { _id: blogId, createdBy: user_id },
      { ...body },
      { new: true, runValidators:true }
    );
    if (!blog)
      throw new UnAuthorisedError("you are not unauthorised for this update");
    res.status(200).json({ status: true, blog });
  } catch (error) {
    next(error);
  }
};

const deleteBlog = async (req, res, next) => {
  const { user_id } = req.user;
  const { id: blogId } = req.params;
  try {
    const blog = await blogPostModel.deleteOne({
      _id: blogId,
      createdBy: user_id,
    });
    if (!blog)
      throw new UnAuthorisedError(
        "you are not unauthorised to delete this blogpost"
      );

    res.status(200).json({ status: true, blog });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBlog,
  singleBlog,
  getAllBlogs,
  getPublishedBlogs,
  updateBlog,
  myBlogs,
  deleteBlog,
};
