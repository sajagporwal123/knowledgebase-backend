const envConfig = require("../../../config/environment/environment.config");

module.exports = (sequelize, DataTypes) => {
  const content = sequelize.define(
    "content",
    {
      contentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      fileUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          const rawValue = this.getDataValue("fileUrl");
          return rawValue
            ? `${envConfig.S3ContentBuckerPath}/${envConfig.contentPath}/${rawValue}`
            : null;
        },
      },
      userId: {
        type: DataTypes.STRING(24),
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {}
  );
  content.associate = (models) => {
    // associations can be defined here
    content.belongsTo(models.category, {
      foreignKey: "categoryId",
    });
    models.category.hasMany(models.content, {
      foreignKey: "categoryId",
    });
  };
  return content;
};
