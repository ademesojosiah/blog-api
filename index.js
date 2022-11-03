const express = require("express");
const app = express();
const database = require("./db");
require("dotenv").config();
require("./middleware/passportAuth");
const passport = require("passport");
const authRouter = require("./routes/userAuthRouter");
const errorhandler = require("./middleware/erroHandler");
const pageNotFound = require("./middleware/pageNotFound");
const bodyParser = require("body-parser");
const { blogRouter, generalblogRouter } = require("./routes/blogRouter");

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRouter);

app.use("/blog", generalblogRouter);

app.use(
  "/blog/client",
  passport.authenticate("jwt", { session: false }),
  blogRouter
);

app.get("/", (req, res) => {
  res.json({ status: true, message: "welcome to my blog" });
});

app.use(pageNotFound);
app.use(errorhandler);

const PORT = process.env.PORT || 3334;
database.connectDb();

app.listen(PORT, () => {
  console.log(`server connected succesfully to http://localhost:${PORT}`);
});
