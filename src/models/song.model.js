const Sequelize = require('sequelize');

module.exports = (sequelize, dataType) => {
  const song = sequelize.define('song', {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },

    title: {
      type: dataType.STRING,
      allowNull: false,
      trim: true,
      validate: {
        len: [2, 50],
      },
    },

    genre: {
      type: dataType.STRING,
      allowNull: true,
    },

    lyrics: {
      type: dataType.TEXT,
      allowNull: true,
    },

    artworkCoverUri: {
      type: dataType.STRING,
      allowNull: true,
      validate: {
        isURL: true,
      },
    },

    audioURI: {
      type: dataType.STRING,
      allowNull: false,
      validate: {
        isURL: true,
      },
    },

    releaseDate: {
      type: dataType.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
  });

  return song;
};
