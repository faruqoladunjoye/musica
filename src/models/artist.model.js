const Sequelize = require('sequelize');

module.exports = (sequelize, dataType) => {
  const artist = sequelize.define('artist', {
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

    artistName: {
      type: dataType.STRING,
      allowNull: false,
      trim: true,
      lowercase: true,
      unique: true,
    },

    bio: {
      type: dataType.TEXT,
      allowNull: true,
    },

    profilePicture: {
      type: dataType.STRING,
      allowNull: false,
      validate: {
        isURL: true,
      },
    },

    title: {
      type: dataType.STRING,
      allowNull: false,
      trim: true,
      validate: {
        len: [2, 50],
      },
    },

    albums: {
      type: dataType.ARRAY(dataType.STRING),
      allowNull: false,
    },

    songs: {
      type: dataType.ARRAY(dataType.STRING),
      allowNull: false,
    },
  });

  return artist;
};
