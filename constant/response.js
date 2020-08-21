const messageConstant = require("./message");

const ERROR500 = {
  CODE: 500,
  MESSAGE: messageConstant.TryAgain,
};

const ERROR400 = {
  CODE: 400,
  MESSAGE: messageConstant.BadRequest,
};

const SUCCESS200 = {
  CODE: 200,
  MESSAGE: messageConstant.Success,
};

const ERROR401 = {
  CODE: 401,
  MESSAGE: messageConstant.NotAuthorized,
};

module.exports = {
  ERROR500,
  ERROR400,
  SUCCESS200,
  ERROR401,
};
