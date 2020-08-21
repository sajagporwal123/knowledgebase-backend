const mongoose = require("mongoose");

const utils = require("../../../helper/logger/utils");
const envConfig = require("../../../config/environment/environment.config");

/**
 * User DB connection user mongoose
 */
mongoose
  .connect(
    `mongodb://${envConfig.contentDbHost}:${envConfig.userDbPort}/${envConfig.userDbName}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(() => {
    utils.infoLog(`${envConfig.userDbName} Database server connected....`);
  })
  .catch((error) => {
    utils.infoLog("Could not connect Database server....");
    utils.errorLog(error);
  });
