// Model
const model = require("../../../db/content/models");

const categoryService = {};

/**
 * @description Insert Category Data
 * @param {Object} category
 */
categoryService.createCategory = async (category) => {
  const result = await model.category.create(category);
  return result;
};

/**
 * @description Get Category List By User Id
 * @param {String} userId
 */
categoryService.getList = async (userId) => {
  const result = await model.category.findAll({
    where: {
      status: "ACTIVE",
      userId: userId,
    },
    attributes: ["name", "categoryId"],
  });
  return result;
};

/**
 * @description Get Category By User Id and Name(case insensitive).
 * @param {String} userId
 * @param {String} name
 */
categoryService.getCategory = async (userId, name) => {
  name = name.toLowerCase();
  const result = await model.category.findOne({
    where: {
      userId: userId,
      name: model.sequelize.where(
        model.sequelize.fn("LOWER", model.sequelize.col("name")),
        name
      ),
    },
  });
  return result;
};

/**
 * @description Get Category By User Id and Category Id
 * @param {String} userId
 * @param {Number} categoryId
 */
categoryService.getCategoryById = async (userId, categoryId) => {
  const result = await model.category.findOne({
    where: {
      userId,
      categoryId,
    },
  });
  return result;
};

module.exports = categoryService;
