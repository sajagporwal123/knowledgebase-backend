// Model
const User = require("../../../db/user/models/user");

const userService = {};

/**
 * @description Insert New User
 * @param {Object} userData
 */
userService.createUser = (userData) => {
  const user = new User(userData);
  return user.save();
};

/**
 * @description Get User Email Address By Id
 * @param {String} userId
 */
userService.getUser = async (userId) => {
  const result = await User.findById(userId, {
    email: 1,
    _id: 1,
  }).lean();
  return result;
};

/**
 * @description Get User Details
 * @param {Object} query
 * @param {Object} query.condition Condition on which basis we want to find user
 * @param {Object} query.requiredFields Fields which we want to return
 */
userService.getUserDetails = async (query) => {
  const result = await User.findOne(
    query.condition,
    query.requiredFields
  ).lean();
  return result;
};

/**
 * @description Update User Details
 * @param {Object} query
 * @param {Object} query.condition Condition on which basis we want to find user
 * @param {Object} query.dataToUpdate Fields which we want to update
 */
userService.updateUserDetails = async (query) => {
  const result = await User.findByIdAndUpdate(
    query.condition,
    query.dataToUpdate,
    {
      new: true,
    }
  );
  return result;
};

module.exports = userService;
