const validator = require('validator');
const { roles } = require('../config/roles');
const Sequelize = require('sequelize');

module.exports = (sequelize, dataType) => {
  const user = sequelize.define('user', {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },

    fullName: {
      type: dataType.STRING,
      allowNull: false,
      trim: true,
      validate: {
        len: [3, 50],
      },
    },

    username: {
      type: dataType.STRING,
      allowNull: false,
      trim: true,
      lowercase: true,
      unique: true,
    },

    email: {
      type: dataType.STRING,
      allowNull: false,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },

    phoneNumber: {
      type: dataType.STRING,
      allowNull: true,
      validate: {
        isPhoneNumber: function (value) {
          if (!value) return;
          if (!/^(\+\d{1,3})?\d{10}$/.test(value)) {
            throw new Error('Invalid phone number format');
          }
        },
      },
    },

    password: {
      type: dataType.STRING,
      allowNull: false,
      trim: true,
      minlength: 8,
      validate(value) {
        if (
          !value.match(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
          )
        ) {
          throw new Error(
            'Password must contain at least one letter and one number'
          );
        }
      },
    },

    profilePicture: {
      type: dataType.STRING,
      allowNull: true,
      validate: {
        isURL: true,
      },
    },

    role: {
      type: dataType.ENUM(...roles),
      defaultValue: 'listener',
    },

    isEmailVerified: {
      type: dataType.BOOLEAN,
      defaultValue: false,
    },

    dateJoined: {
      type: dataType.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
  });

  return user;
};
