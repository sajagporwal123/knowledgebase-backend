/* eslint-disable prefer-destructuring */
/* eslint-disable no-underscore-dangle */
//  Modules
const bcrypt = require("bcrypt");

// Enviornment Configuration
const envConfig = require("../../../config/environment/environment.config");

// Services
const userService = require("./userService");

// JWT
const jwt = require("../../../helper/auth/jwt");

// Constants
const messageConstant = require("../../../constant/message");
const {
  SUCCESS200,
  ERROR500,
  ERROR400,
} = require("../../../constant/response");

const userCtr = {};

/**
 * @description Create User
 * @param {Object} req
 * @param {Object} res
 * @returns {Object}
 */
userCtr.createUser = async (req, res) => {
  try {
    const { body } = req;
    let userData;
    /**
     * @description Incrypt password and store
     */
    body.password = bcrypt.hashSync(
      body.password,
      parseInt(envConfig.saltRounds)
    );
    /**
     * Check is email is already registered
     * if yes then update the user details othewise insert new user
     */
    if (body.isAlreadyRegistered) {
      const query = {
        condition: {
          email: body.email,
        },
        dataToUpdate: {
          password: body.password,
        },
      };
      userData = await userService.updateUserDetails(query);
    } else {
      userData = await userService.createUser(body);
    }
    return res.status(SUCCESS200.CODE).json({
      data: {
        signUpType: userData.signUpType,
        email: userData.email,
        userId: userData._id,
      },
      /**
       * Generate User JWT token and return in response
       */
      token: jwt.getAuthToken(userData._id),
    });
  } catch (error) {
    return res.status(ERROR500.CODE).json({
      error,
    });
  }
};

/**
 * @description User Login with email and password
 * @param {Object} req
 * @param {Object} res
 * @returns {Object}
 */
userCtr.login = async (req, res) => {
  try {
    let { email } = req.body;
    const { password } = req.body;
    email = email.toLowerCase();
    const query = {
      condition: {
        email,
      },
      requiredFields: {
        email: 1,
        _id: 1,
        password: 1,
        signUpType: 1,
      },
    };
    const userDetails = await userService.getUserDetails(query);
    if (userDetails) {
      /**
       * Verify User Password
       */
      if (bcrypt.compareSync(password, userDetails.password)) {
        return res.status(SUCCESS200.CODE).json({
          data: {
            signUpType: userDetails.signUpType,
            email: userDetails.email,
            userId: userDetails._id,
          },
          /**
           * Generate User JWT token and return in response
           */
          token: jwt.getAuthToken(userDetails._id),
        });
      }
      return res.status(ERROR400.CODE).json({
        error: messageConstant.InvalidCredentails,
      });
    } else {
      return res.status(ERROR400.CODE).json({
        error: messageConstant.InvalidCredentails,
      });
    }
  } catch (error) {
    return res.status(ERROR500.CODE).json({
      error,
    });
  }
};

/**
 * @description Login With Social Media
 * @param {Object} req
 * @param {Object} res
 * @returns {Object}
 */
userCtr.createSocialLoginUser = async (req, res) => {
  try {
    const { isAlreadyRegistered, email } = req.body;
    if (!isAlreadyRegistered) {
      const { body } = req;
      req.body = await userService.createUser(body);
    }
    const { signUpType, _id } = req.body;
    return res.status(SUCCESS200.CODE).json({
      data: {
        signUpType,
        email,
        userId: _id,
      },
      /**
       * Generate User JWT token and return in response
       */
      token: jwt.getAuthToken(_id),
    });
  } catch (error) {
    return res.status(ERROR500.CODE).json({
      error,
    });
  }
};

module.exports = userCtr;
