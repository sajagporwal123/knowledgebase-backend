// Modules
const express = require("express");

const router = express.Router();

/**
 * Module Routes
 */
router.use("/", require("../modules"));

module.exports = router;
