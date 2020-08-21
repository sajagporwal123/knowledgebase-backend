/* eslint-disable no-console */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");

const utils = require("../../../helper/logger/utils");
const envConfig = require("../../../config/environment/environment.config");

const basename = path.basename(__filename);
const db = {};
const Op = Sequelize.Op;
const operatorsAliases = {
  $eq: Op.eq,
  $ne: Op.ne,
  $any: Op.any,
  $all: Op.all,
  $values: Op.values,
  $col: Op.col,
  $like: Op.like,
};

/**
 * Content Db Connection by using sequelize
 */
const sequelize = new Sequelize(
  envConfig.contentDbName,
  envConfig.contentDbUser,
  envConfig.contentDbPassword,
  {
    host: envConfig.contentDbHost,
    port: envConfig.contentDbPort,
    dialect: "mysql",
    pool: {
      max: 100,
      min: 0,
      idle: 10000,
    },
    logging: console.log,
    charset: "utf8",
    collate: "utf8_unicode_ci",
    define: {
      // prevent sequelize from pluralizing table names
      freezeTableName: true,
    },
    operatorsAliases: operatorsAliases,
  }
);
sequelize
  .authenticate()
  .then(() => {
    utils.infoLog(`${envConfig.contentDbName} Database server connected....`);
  })
  .catch((err) => {
    utils.infoLog("Could not connect Database server....");
    utils.errorLog(err);
  });

/**
 * Import all models
 */
fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Sync Database
sequelize.sync();

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
