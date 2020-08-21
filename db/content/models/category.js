/* eslint-disable no-unused-vars */
const { categoryConstant } = require("../../../constant/model");

module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define(
    "category",
    {
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(30),
        isLowercase: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.STRING(24),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM,
        values: categoryConstant.statusConstant,
        defaultValue: categoryConstant.defaultStatus,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {}
  );
  return category;
};
