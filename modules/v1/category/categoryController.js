/* eslint-disable no-underscore-dangle */

// Services
const categoryService = require("./categoryService");

// Constants
const messageConstant = require("../../../constant/message");
const { SUCCESS200, ERROR500 } = require("../../../constant/response");

const categoryCtr = {};

/**
 * @description Create New Category
 * @param {Object} req
 * @param {Object} res
 * @returns {Object}
 */
categoryCtr.create = async (req, res) => {
  try {
    const { user, body } = req;
    body.userId = user._id.toString();
    const data = await categoryService.createCategory(body);
    return res.status(SUCCESS200.CODE).json({
      data,
    });
  } catch (error) {
    return res.status(ERROR500.CODE).json({
      error:
        error.errors && error.errors.length > 0
          ? error.errors[0].message
          : messageConstant.InternalServerError,
    });
  }
};

/**
 * @description Get Category List
 * @param {Object} req
 * @param {Object} res
 * @returns {Object}
 */
categoryCtr.getList = async (req, res) => {
  try {
    const list = await categoryService.getList(req.user._id);
    return res.status(SUCCESS200.CODE).json({
      list: list,
    });
  } catch (error) {
    return res.status(ERROR500.CODE).json({
      error:
        error.errors && error.errors.length > 0
          ? error.errors[0].message
          : messageConstant.InternalServerError,
    });
  }
};

module.exports = categoryCtr;
