const userModel = require("../models/user.model");
const captionModel = require("../models/caption.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const blacklistTokenModel = require("../models/blacklistToken.model");



module.exports.authUser = async (req,res,next) => {
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    const isBlackListed = await blacklistTokenModel.findOne({ token:token });
    if (isBlackListed) {
    res.status(401).json({
        message: "Unauthorized"
    });
}



try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        req.user = user;
        return next();
    } catch (err) {
        return res.status(401).json({
            message: "Unauthorized",
            error: err.message
        });
    }
}

module.exports.authCaption = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    // Check if token is blacklisted
    const isBlackListed = await blacklistTokenModel.findOne({ token });
    if (isBlackListed) {
      return res.status(401).json({ message: "Unauthorized: Token is blacklisted" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach caption user to request
    const caption = await captionModel.findById(decoded._id);
    if (!caption) {
      return res.status(401).json({ message: "Unauthorized: Caption not found" });
    }

    req.caption = caption;
    next();

  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized",
      error: err.message,
    });
  }
};


