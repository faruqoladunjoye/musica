const Sequelize = require('sequelize');

module.exports = (sequelize, dataType) => {
  const album = sequelize.define('album', {
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

    description: {
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

    songs: {
      type: dataType.ARRAY(dataType.STRING),
      allowNull: true,
    },

    releaseDate: {
      type: dataType.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
  });

  return album;
};
