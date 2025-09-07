const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userController = require("../controller/user.controller");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullName.firstName").isLength({ min: 3 }).withMessage("First Name must be atleast of 3"),
    body("password").isLength({ min: 8 }).withMessage(
        "Password must be atleast of 8 characters long"
    )
  ],
  userController.registerUser
);
module.exports = router;
