const jwt = require("jsonwebtoken");
const envConfig = require("../../config/environment/environment.config");

const auth = {};

/**
 * @description Generate JWT token based on payload
 * @param {Object} data
 * @returns {String}
 */
auth.getAuthToken = (data) =>
  jwt.sign(
    {
      data,
    },
    envConfig.secretKey
  );

/**
 * @description Decode JWT token and return payload
 * @param {String} token
 * @returns {Object}
 */
auth.decodeAuthToken = (token) => {
  if (token) {
    try {
      return jwt.decode(token);
    } catch (error) {
      return false;
    }
  }
  return false;
};

module.exports = auth;
