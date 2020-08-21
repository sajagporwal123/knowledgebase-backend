// Environment variables
require("dotenv").config();

// Modules
const http = require("http");

// Configuration
const app = require("./config/app");

// Utils
const utils = require("./helper/logger/utils");

/**
 * Create Server
 */
http.createServer(app).listen(app.get("port"), () => {
  utils.infoLog(`Express server listening on port ${app.get("port")}`);
});
