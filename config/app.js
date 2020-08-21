const express = require("express");
const cors = require("cors");

// Body Parser
const bodyParser = require("body-parser");

// Created Helpers
const utils = require("../helper/logger/utils");
const envConfig = require("../config/environment/environment.config");
global.models = require("../db/content/models");
require("../db/user/models");
require("../helper/auth/passport");

const app = express();
app.set("port", envConfig.serverPort);
app.use(bodyParser.json());

// CORS
app.use(cors());

if (envConfig.nodeEnv === "production") {
  process.on("uncaughtException", (err) => {
    utils.errorLog(
      `${new Date().toUTCString()} uncaughtException: ${err.message}`
    );
    utils.errorLog(err.stack);
    // Todo :- Send Email To Admin
    process.exit(1);
  });

  process.on("unhandledRejection", (reason) => {
    utils.errorLog(`${new Date().toUTCString()} unhandledRejection:`);
    utils.errorLog(reason);
    // Todo :- Send Email To Admin
    process.exit(1);
  });
}

// ROUTER
app.use("/api", require("../routes"));

module.exports = app;
