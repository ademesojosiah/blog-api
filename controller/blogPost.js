const { blogPostModel } = require("../model");
const { UnAuthorisedError, BadRequest } = require("../errors");

const createBlog = async (req, res, next) => {
  try {
    const {
      user: { fullname, user_id },
      body,
    } = req;
    body.author = user_id ;
    body.writtenBy = fullname;
    body.read_count = 0
    body.reading_time =  `${req.body.body.length / 250} minutes`
    const blog = await blogPostModel.create({...body});
    res.status(200).json({ status: true, blog });
  } catch (error) {
    next(error);
  }
};

const getPublishedBlogs = async (req, res, next) => {
  try {
    const { author, title, tags ,order_by } = req.query
    const queryObject = {
      state : 'Published'
    }



    if(author){
      queryObject.writtenBy = {$regex: author, $options:'i'}
    }

    if(title){
      queryObject.title =  {$regex: title, $options:'i'}
    }
    

    if(tags){
      queryObject.tags  =  {$regex: tags, $options:'i'}
    }

    let blogs =  blogPostModel.find(queryObject);

    if(order_by){
      const sortItem = order_by.split(',').join(' ') 
      blogs = blogs.sort(sortItem)
   }

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.per_page) || 20
    const skip = (page-1) * limit

    blogs = await blogs.skip(skip).limit(limit)

    res.status(200).json({ status: true, blogs });
  } catch (error) {
    next(error);
  }
};

const myBlogs = async (req, res, next) => {
  try { 
    const { state:blogState} = req.query
    const { user_id } = req.user;
    const queryObject = {
      author: user_id,
    }

    if(blogState){
      queryObject.state = blogState
    }

    let blog = blogPostModel.find(queryObject);
    if(!blog){
        throw new UnAuthorisedError(`no Blog post created yet`)
    }

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.per_page) || 5
    const skip = (page - 1) * limit

    blog = await blog.skip(skip).limit(limit)


    res.status(200).json({ status: true, blog });
  } catch (error) {
    next(error);
  }
};

const singleBlog = async (req, res, next) => {
  const { id: blogId } = req.params;
  try {
    const blog = await blogPostModel.findOne({ _id: blogId,state:"Published" }).populate('author', '-password');
    if (!blog) throw new BadRequest(`no blog post with id:${blogId}`);
    blog.read_count += 1;
    await blog.save()
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
  getPublishedBlogs,
  updateBlog,
  myBlogs,
  deleteBlog,
};
