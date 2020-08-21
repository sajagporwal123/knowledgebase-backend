// Modules
const express = require("express");
const router = express.Router();

// V1 Version Routes
router.use("/v1", require("./v1"));

module.exports = router;
