const Sequelize = require('sequelize');

module.exports = (sequelize, dataType) => {
  const playlist = sequelize.define('playlist', {
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

    description: {
      type: dataType.TEXT,
      allowNull: true,
    },

    songs: {
      type: dataType.ARRAY(dataType.STRING),
      allowNull: false,
    },

    playlistCoverUri: {
      type: dataType.STRING,
      allowNull: true,
      validate: {
        isURL: true,
      },
    },
  });

  return playlist;
};
