// Modules
const express = require("express");
const contentRouter = express.Router();

// Authentication
const passport = require("passport");

// Mulipart
const multipart = require("connect-multiparty");
const multipartMiddleware = multipart();

// Controller
const contentCtr = require("./contentController");

// Request Schema
const schemaContent = require("./contentRequestValidator");

// Validator
const validator = require("../../../helper/validator/requestValidation");

// Middleware
const contentMiddleware = require("./contentMiddleware");

/**
 * Add Content Route
 */
const addContentMiddleware = [
  passport.authenticate("jwt", {
    session: false,
  }),
  multipartMiddleware,
  validator.isValidRequest(schemaContent),
  contentMiddleware.checkUserIsValidForCreateContent,
  contentCtr.create,
];
contentRouter.post("/add", addContentMiddleware);

/**
 * Get Content List Route
 */
const getContentListMiddleware = [
  passport.authenticate("jwt", {
    session: false,
  }),
  contentCtr.getContentList,
];
contentRouter.get("/list", getContentListMiddleware);

module.exports = contentRouter;
