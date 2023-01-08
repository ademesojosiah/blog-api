const express = require("express");
const app = express();
const helmet = require('helmet')
require("dotenv").config();
require("./middleware/passportAuth");


//import rate limit
const rateLimit = require('express-rate-limit')

//import passport
const passport = require("passport");


// import swagger
const swaggerUI = require('swagger-ui-express')

const YAML = require('yamljs')

const swaggerDocument = YAML.load('./swagger.yaml')


// import errorhandler and pagenotfound controller
const errorhandler = require("./middleware/erroHandler");
const pageNotFound = require("./middleware/pageNotFound");


const bodyParser = require("body-parser");


// import routers 
const authRouter = require("./routes/userAuthRouter");
const { blogRouter, generalBlogRouter } = require("./routes/blogRouter");

// import cors
const cors = require('cors')

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 50, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})


app.use(limiter)

//security middleware
app.use(helmet())

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
  res.send('<h1>Blog API</h1><a href="/api-docs">Documentation</a>')
});

//documentaion page
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))


//initiated the page not found and errorHandler
app.use(pageNotFound);
app.use(errorhandler);

module.exports = app

