const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');

const createUser = catchAsync(async (req, res) => {
  req.body.accountManagerId = req.user.id;
  const user = await userService.createUser(req.body);
  // send an email to the created user
  await emailService.sendOnboardingEmail(
    user.dataValues.email,
    user.dataValues.fullName,
    user.dataValues.username
  );
  return res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, [/* 'name',  */ 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (req.user.role === 'reseller' && req.user.id !== user.accountManagerId) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
  }
  res.send(user);
});

const getProfile = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.user.id);
  return res.status(httpStatus.OK).send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getProfile,
};
