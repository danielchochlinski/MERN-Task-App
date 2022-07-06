/* app seperated for testing purpose */
const express = require("express");
require("./db/mongoose");
const cors = require("cors");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
app.use(cors());
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers, *, Access-Control-Allow-Origin",
    "Origin, X-Requested-with, Content_Type,Accept,Authorization",
    "http://localhost:4200"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
    return res.status(200).json({});
  }
  next();
});

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

module.exports = app;
