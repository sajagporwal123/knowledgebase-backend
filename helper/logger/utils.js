const { winston } = require("./winston");
const envConfig = require("../../config/environment/environment.config");

const utils = {};

/**
 * @description Print/Store Error Logs
 * @param  {...any} args
 */
utils.errorLog = (...args) => {
  if (envConfig.showLog === "true") {
    try {
      winston.error(args);
    } catch (e) {
      winston.log(e);
    }
  }
};

/**
 * @description Print/Store Info Logs
 * @param  {...any} args
 */
utils.infoLog = (...args) => {
  if (envConfig.showLog === "true") {
    try {
      winston.info(args);
    } catch (e) {
      winston.log(e);
    }
  }
};

module.exports = utils;
