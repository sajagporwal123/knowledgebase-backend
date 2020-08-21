const Ajv = require("ajv");
const { ERROR400 } = require("../../constant/response");

const validator = {};

/**
 * @description Validate Schema
 * @param {Object} schema
 */
validator.isValidRequest = (schema) => (req, res, next) => {
  const ajv = new Ajv();
  const isValid = ajv.validate(schema, req.body);
  if (!isValid) {
    const errorMessages = ajv.errorsText();
    return res.status(ERROR400.CODE).json({
      valid: false,
      err: `${errorMessages}`,
    });
  }
  return next();
};

module.exports = validator;
