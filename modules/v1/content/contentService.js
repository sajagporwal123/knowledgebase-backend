// Model
const model = require("../../../db/content/models");

const contentService = {};

/**
 * @description Insert Content in DB
 * @param {Object} content
 */
contentService.createContent = async (content) => {
  const result = await model.content.create(content);
  return result;
};

/**
 * @description Get Content list based on the usedId and category id and content match
 * @param {String} userId
 * @param {Object} condition
 */
contentService.getList = async (userId, condition) => {
  let queryCondition = {
    userId: userId,
  };
  if (condition.categoryId) {
    queryCondition.categoryId = condition.categoryId;
  }
  if (condition.content) {
    queryCondition.content = model.sequelize.where(
      model.sequelize.fn("LOWER", model.sequelize.col("content")),
      "LIKE",
      "%" + condition.content.toLowerCase() + "%"
    );
  }
  const result = await model.content.findAll({
    where: queryCondition,
    attributes: ["content", "contentId", "fileUrl"],
  });
  return result;
};

module.exports = contentService;
