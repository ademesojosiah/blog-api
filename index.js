const express = require("express");
const app = express();
require("dotenv").config();
require("./middleware/passportAuth");
const passport = require("passport");
const authRouter = require("./routes/userAuthRouter");
const errorhandler = require("./middleware/erroHandler");
const pageNotFound = require("./middleware/pageNotFound");
const bodyParser = require("body-parser");
const { blogRouter, generalBlogRouter } = require("./routes/blogRouter");

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRouter);

app.use("/blog/all", generalBlogRouter);

app.use(
  "/user/blog",
  passport.authenticate("jwt", { session: false }),
  blogRouter
);

app.get("/", (req, res) => {
  res.json({ status: true, message: "welcome to my blog" });
});

app.use(pageNotFound);
app.use(errorhandler);

module.exports = app

