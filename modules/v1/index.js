// Modules
const express = require("express");
const router = express.Router();
const path = require("path");

// Utils
const utils = require("../../helper/logger/utils");

// Constants
const { ERROR400 } = require("../../constant/response");

// Api Version
const apiVersion = path.basename(__filename, ".js");

/**
 * Adding Api Version In Request
 */
router.use((req, res, next) => {
  req.apiVersion = apiVersion;
  return next();
});

/**
 * User Module Routes
 */
router.use("/user", require("./user/userRoute"));

/**
 * Category Module Routes
 */
router.use("/category", require("./category/categoryRoute"));

/**
 * Content Module Routes
 */
router.use("/content", require("./content/contentRoute"));

router.all("/*", (req, res) => {
  utils.infoLog("error log");
  return res.status(ERROR400.CODE).json({
    error: ERROR400.MESSAGE,
  });
});

module.exports = router;
