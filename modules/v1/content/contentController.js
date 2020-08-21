/* eslint-disable no-underscore-dangle */
// Evniornment Configuration
const envConfig = require("../../../config/environment/environment.config");

// Services
const contentService = require("./contentService");

// S3 Helper
const awsUtils = require("../../../helper/aws/s3");

// Constants
const messageConstant = require("../../../constant/message");
const { SUCCESS200, ERROR500 } = require("../../../constant/response");

const contentCtr = {};

/**
 * @description Create Content
 * @param {Object} req
 * @param {Object} res
 * @returns {Object}
 */
contentCtr.create = async (req, res) => {
  try {
    const { user, body, files } = req;
    body.userId = user._id.toString();
    const fileUploadResponse = await awsUtils.fileUploadOnS3(
      envConfig.contentPath,
      files.image
    );
    body.fileUrl = fileUploadResponse.name;
    const data = await contentService.createContent(body);
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
 * @description Get Content List
 * @param {Object} req
 * @param {Object} res
 * @returns {Object}
 */
contentCtr.getContentList = async (req, res) => {
  try {
    const { categoryId, content } = req.query;
    const condition = {
      categoryId,
      content,
    };
    const list = await contentService.getList(req.user._id, condition);
    return res.status(SUCCESS200.CODE).json({
      list: list,
    });
  } catch (error) {
    return res.status(ERROR500.CODE).json({
      error: error.errors ? error.errors : messageConstant.InternalServerError,
    });
  }
};

module.exports = contentCtr;
