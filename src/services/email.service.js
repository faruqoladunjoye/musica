const nodemailer = require('nodemailer');
const config = require('./../config/config');
const logger = require('./../config/logger');

const transport = nodemailer.createTransport(config.email.smtp);
if (config.env !== 'test') {
  transport
    .verify()
    .then(() => logger.info('Connected to email server'))
    .catch(() =>
      logger.warn(
        'Unable to connect to email server. Make sure you have configured the SMTP options in .env'
      )
    );
}

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async (options) => {
  const msg = {
    from: config.email.from,
    to: options?.to,
    subject: options?.subject,
    text: options?.text,
    html: options?.html,
    attachments: options.attachments,
  };
  await transport.sendMail(msg);
};

const sendOnboardingEmail = async (to, fullname, username) => {
  const subject = 'IVR Onboarding';

  const text = `Dear ${username || fullname},
    Welcome to MUSICA 🎶✨

We're thrilled to have you join our music streaming community! Dive into a world of endless music, curated playlists, and personalized recommendations made just for you. 

To get started, log in using the link below and explore everything MUSICA has to offer:  
[http://localhost:3000/v1/auth/login]

Enjoy the rhythm, discover new tunes, and let the music play! 🎧`;
  await sendEmail({ to, subject, text });
};

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendResetPasswordEmail = async (to, token) => {
  const subject = 'Reset password';
  // replace this url with the link to the reset password page of your front-end app
  const resetPasswordUrl = `http://link-to-app/reset-password?token=${token}`;
  const text = `Dear user,
To reset your password, click on this link: ${resetPasswordUrl}
If you did not request any password resets, then ignore this email.`;
  await sendEmail({ to, subject, text });
};

/**
 * Send verification email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendVerificationEmail = async (to, token) => {
  const subject = 'Email Verification';
  // replace this url with the link to the email verification page of your front-end app
  const verificationEmailUrl = `http://link-to-app/verify-email?token=${token}`;
  const text = `Dear user,
To verify your email, click on this link: ${verificationEmailUrl}
If you did not create an account, then ignore this email.`;
  await sendEmail({ to, subject, text });
};

module.exports = {
  transport,
  sendEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
  sendOnboardingEmail,
};
