const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const connectToDB = require("./db/db.js");
const userRoutes = require('./routes/user.routes.js');
const captionRoutes = require('./routes/caption.routes.js');
connectToDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use('/users',userRoutes);
app.use('/captions',captionRoutes);

module.exports = app;
