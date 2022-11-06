const express = require("express");
const app = express();
require("dotenv").config();
require("./middleware/passportAuth");

//import passport
const passport = require("passport");

// import errorhandler and pagenotfound controller
const errorhandler = require("./middleware/erroHandler");
const pageNotFound = require("./middleware/pageNotFound");


const bodyParser = require("body-parser");


// import routers 
const authRouter = require("./routes/userAuthRouter");
const { blogRouter, generalBlogRouter } = require("./routes/blogRouter");

// import cors
const cors = require('cors')

// initiate body parser
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));


app.use(cors())

//sign up and sign in route
app.use("/auth", authRouter);


// not logged  in user route
app.use("/blog/all", generalBlogRouter);

// logged in user

app.use(
  "/user/blog",
  passport.authenticate("jwt", { session: false }),
  blogRouter
);


// home page
app.get("/", (req, res) => {
  res.json({ status: true, message: "welcome to my blog" });
});


//initiated the page not found and errorHandler
app.use(pageNotFound);
app.use(errorhandler);

module.exports = app

