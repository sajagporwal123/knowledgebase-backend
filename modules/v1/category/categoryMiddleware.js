// Services
const categoryService = require("./categoryService");

// Constants
const messageConstant = require("../../../constant/message");
const { ERROR400, ERROR500 } = require("../../../constant/response");

const categoryMiddleware = {};

/**
 * @description Check Category name in already exists for logged in user
 * @param {Object} req
 * @param {Object} res
 * @param {*} next
 */
categoryMiddleware.checkCategoryAlreadyExists = async (req, res, next) => {
  try {
    const { name } = req.body;
    const category = await categoryService.getCategory(req.user._id, name);
    if (category) {
      return res.status(ERROR400.CODE).json({
        error: messageConstant.CategoryAlreadyExists,
      });
    } else {
      next();
    }
  } catch (error) {
    return res.status(ERROR500.CODE).json({
      error: error,
    });
  }
};

module.exports = categoryMiddleware;
