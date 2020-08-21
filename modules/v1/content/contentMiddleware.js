// Created Service
const categoryService = require("../category/categoryService");

// Constant
const messageConstant = require("../../../constant/message");
const { ERROR500, ERROR401 } = require("../../../constant/response");

const contentMiddleware = {};

/**
 * @description Check User is valid for create content in selected category
 * @param {Object} req
 * @param {Object} res
 * @param {*} next
 */
contentMiddleware.checkUserIsValidForCreateContent = async (req, res, next) => {
  try {
    const { categoryId } = req.body;
    const category = await categoryService.getCategoryById(
      req.user._id,
      categoryId
    );
    if (category) {
      next();
    } else {
      return res.status(ERROR401.CODE).json({
        error: messageConstant.NotAuthorized,
      });
    }
  } catch (error) {
    return res.status(ERROR500.CODE).json({
      error: error,
    });
  }
};

module.exports = contentMiddleware;
