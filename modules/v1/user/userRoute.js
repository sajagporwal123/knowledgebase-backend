// Modules
const express = require("express");
const userRouter = express.Router();

// Controller
const userCtr = require("./userController");

// Request Schema
const { createOrLoginUserSchema } = require("./userRequestValidator");

// Validator
const validator = require("../../../helper/validator/requestValidation");

// Middleware
const userMiddleware = require("./userMiddleware");

/**
 * User Sign Up Route
 */
const userSignUpMiddleware = [
  validator.isValidRequest(createOrLoginUserSchema),
  userMiddleware.checkEmailAlreadyExists,
  userCtr.createUser,
];
userRouter.post("/sign-up", userSignUpMiddleware);

/**
 * User Login Route
 */
const userLoginMiddleware = [
  validator.isValidRequest(createOrLoginUserSchema),
  userCtr.login,
];
userRouter.post("/login", userLoginMiddleware);

/**
 * User Login with social media route
 */
const socailSignInMiddleware = [
  userMiddleware.validateSocialToken,
  userCtr.createSocialLoginUser,
];
userRouter.post("/social-login", socailSignInMiddleware);

module.exports = userRouter;
