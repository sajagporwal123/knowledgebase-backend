const AWS = require("aws-sdk");
const path = require("path");
const fs = require("fs");
const { v1: uuidv1 } = require("uuid");

const constant = require("../../constant/constant");
const envConfig = require("../../config/environment/environment.config");

/**
 * Configure AWS Credentails
 */
AWS.config.update({
  accessKeyId: envConfig.awsAccessKey,
  secretAccessKey: envConfig.awsSecretKey,
});

const S3 = new AWS.S3({
  apiVersion: constant.S3_API_VERSION,
});

const awsUtils = {};

/**
 * @description File Upload to S3
 * @param {String} uploadPath
 * @param {File} file
 */
awsUtils.fileUploadOnS3 = (uploadPath, file) =>
  new Promise((resolve, reject) => {
    const oldFilename = file.path;
    const fileName = file.name;
    const extension = path.extname(fileName);
    const data = fs.readFileSync(oldFilename);
    const newFilename = `${uuidv1()}${extension}`;
    const newPath = `${uploadPath}/${newFilename}`;
    const params = {
      Bucket: envConfig.S3BucketName,
      Key: newPath,
      ContentType: file.type,
      Body: data,
      ACL: "public-read",
    };
    S3.upload(params, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve({
          result,
          name: newFilename,
        });
      }
    });
  });

module.exports = awsUtils;
