const taskRouter = require("./routers/tasks");
const userRouter = require("./routers/users");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

require("./db/mongoose");
const express = require("express");

const app = express();
app.use(cors());

// to parse whatever is coming
app.use(express.json());
app.use(userRouter, taskRouter);

module.exports = app;
