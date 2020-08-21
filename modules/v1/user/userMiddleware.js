// Modules
const fetch = require("node-fetch");

// Services
const userService = require("./userService");

// Constants
const constant = require("../../../constant/constant");
const { accountConstant } = require("../../../constant/model");
const messageConstant = require("../../../constant/message");
const { ERROR400, ERROR500 } = require("../../../constant/response");

const userMiddleware = {};

/**
 * @description Check is email is already registered
 * @param {object} req
 * @param {object} res
 * @param  next
 */
userMiddleware.checkEmailAlreadyExists = async (req, res, next) => {
  try {
    let { email } = req.body;
    email = email.toLowerCase();
    const query = {
      condition: {
        email,
      },
      requiredFields: {
        email: 1,
        signUpType: 1,
      },
    };
    const user = await userService.getUserDetails(query);
    if (user) {
      /**
       * Check is email is alredy registered with signUpType Email
       */
      if (user.signUpType === accountConstant.signTypeName.EMAIL) {
        return res.status(ERROR400.CODE).json({
          error: messageConstant.EmailAlreadyRegistered,
        });
      } else {
        req.body.isAlreadyRegistered = true;
        next();
      }
    } else {
      next();
    }
  } catch (error) {
    return res.status(ERROR500.CODE).json({
      error,
    });
  }
};

/**
 * @description Verify Social Media Token
 * @param {Object} req
 * @param {Object} res
 * @param {*} next
 */
userMiddleware.validateSocialToken = async (req, res, next) => {
  try {
    const { socailMedia, token } = req.body;
    if (socailMedia === "GOOGLE") {
      let data = await fetch(
        constant.GOOGLE_VERIFY_TOKEN_URL + "?id_token=" + token
      ).then((res) => res.json());
      if (data.iss) {
        const email = data.email.toLowerCase();
        req.body.email = email;
        const query = {
          condition: {
            email,
          },
          requiredFields: {
            email: 1,
            signUpType: 1,
            _id: 1,
          },
        };
        const user = await userService.getUserDetails(query);
        if (user) {
          req.body._id = user._id;
          req.body.isAlreadyRegistered = true;
          /**
           * Set Sign Up Type as Social Media in request body
           */
        }
        req.body.signUpType = accountConstant.signTypeName.SOCIAL_MEDIA;
        next();
      } else {
        throw messageConstant.InvalidToken;
      }
    } else {
      throw messageConstant.InvalidSocialMediaType;
    }
  } catch (error) {
    return res.status(ERROR400.CODE).json({
      error: error,
    });
  }
};

module.exports = userMiddleware;
