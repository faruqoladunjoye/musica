const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const authService = require('./../services/auth.service');
const userService = require('./../services/user.service');
const tokenService = require('./../services/token.service');
const emailService = require('./../services/email.service');

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user._id);
  await emailService.sendOnboardingEmail(
    user.email,
    user.fullName,
    user.username
  );
  res.status(httpStatus.status.CREATED).send({ user, tokens });
});

const login = catchAsync(async (req, res) => {
  const { username, password, email } = req.body;

  let user;
  if (email) {
    user = await authService.loginUserWithEmailAndPassword(email, password);
  } else {
    user = await authService.loginWithUsernameAndPassword(username, password);
  }
  const tokens = await tokenService.generateAuthTokens(user._id);
  res.send({ user, tokens });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.status.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(
    req.body.email
  );
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res
    .status(httpStatus.status.OK)
    .send({ status: true, message: 'Check your mail' });
});

const resetPassword = catchAsync(async (req, res) => {
  if (req.body.password !== req.body.confirmPassword) {
    return res
      .status(httpStatus.status.BAD_REQUEST)
      .send({ status: false, message: 'Passwords Do Not Match!' });
  }
  await authService.resetPassword(req.query.token, req.body.password);
  res
    .status(httpStatus.status.OK)
    .send({ status: true, message: 'Password Reset Successful 🎉' });
});

const userResetPassword = catchAsync(async (req, res) => {
  if (req.body.newPassword !== req.body.confirmPassword) {
    return res
      .status(httpStatus.status.BAD_REQUEST)
      .send({ status: false, message: 'Passwords Do Not Match!' });
  }
  await authService.userResetPassword(
    req.user._id,
    req.body.newPassword,
    req.body.oldPassword
  );
  res
    .status(httpStatus.status.OK)
    .send({ status: true, message: 'Password Reset Successful 🎉🎉🎉' });
});

const adminResetPassword = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    return res
      .status(httpStatus.status.NOT_FOUND)
      .send({ status: false, message: 'User Not Found!' });
  }

  const resetPasswordToken = await tokenService.generateResetPasswordToken(
    user.email
  );
  await emailService.sendResetPasswordEmail(user.email, resetPasswordToken);
  res
    .status(httpStatus.status.OK)
    .send({ status: true, message: 'Email sent successfully 🎉🎉🎉' });
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(
    req.user
  );
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  res
    .status(httpStatus.status.OK)
    .send({ status: true, message: 'Email sent successfully 🎉🎉🎉' });
});

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token);
  res.status(httpStatus.status.OK).send({
    status: true,
    message: 'Email Address Verified Successfully 🎉🎉🎉',
  });
});

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
  userResetPassword,
  adminResetPassword,
};
