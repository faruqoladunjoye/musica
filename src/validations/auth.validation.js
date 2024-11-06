const Joi = require('joi');
const { password, phoneNumber } = require('./custom.validation');

const register = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    fullName: Joi.string().required(),
    username: Joi.string().required(),
    phoneNumber: Joi.string().required().custom(phoneNumber),
    address: Joi.string(),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string(),
    password: Joi.string().required(),
    username: Joi.string(),
  }),
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
    confirmPassword: Joi.string().required().custom(password),
  }),
};

const userResetPassword = {
  body: Joi.object().keys({
    newPassword: Joi.string().required().custom(password),
    confirmPassword: Joi.string().required().custom(password),
    oldPassword: Joi.string().required(),
  }),
};

const adminResetPassword = {
  params: Joi.object().keys({
    userId: Joi.number().integer().required(),
  }),
};

const verifyEmail = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail,
  userResetPassword,
  adminResetPassword,
};
