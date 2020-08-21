// Modules
const express = require("express");
const categoryRouter = express.Router();

// Authentication
const passport = require("passport");

// Controller
const categoryCtr = require("./categoryController");

// Middleware
const categoryMiddleware = require("./categoryMiddleware");

// Request Schema
const schemaCategory = require("./categoryRequestValidator");

// Validator
const validator = require("../../../helper/validator/requestValidation");

/**
 * Create Category Route
 */
const addCategoryMiddleware = [
  passport.authenticate("jwt", {
    session: false,
  }),
  validator.isValidRequest(schemaCategory),
  categoryMiddleware.checkCategoryAlreadyExists,
  categoryCtr.create,
];

categoryRouter.post("/add", addCategoryMiddleware);

/**
 * Get Category List Route
 */
const getCategoryListMiddleware = [
  passport.authenticate("jwt", {
    session: false,
  }),
  categoryCtr.getList,
];

categoryRouter.get("/list", getCategoryListMiddleware);

module.exports = categoryRouter;
