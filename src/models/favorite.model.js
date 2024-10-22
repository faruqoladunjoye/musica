const Sequelize = require('sequelize');

module.exports = (sequelize, dataType) => {
  const favorite = sequelize.define('favorite', {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
  });

  return favorite;
};
