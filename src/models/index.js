const Sequelize = require('sequelize');
const { sequelize } = require('../config/config');
const logger = require('../config/logger');

const db = {};

const sequelizeInstance = new Sequelize(
  sequelize.database,
  sequelize.user,
  sequelize.password,
  {
    host: sequelize.host,
    dialect: sequelize.dialect,
    port: sequelize.port,
    pool: {
      min: 0,
      max: 100,
      acquire: 5000,
      Idle: 1000,
    },
  }
);

sequelizeInstance
  .authenticate()
  .then(() => logger.info('============== DB connected ============='))
  .catch((err) => {
    console.log(err);
    logger.error(err);
  });

db.sequelize = sequelizeInstance;
db.Sequelize = Sequelize;

db.users = require('./user.model')(sequelizeInstance, Sequelize);

module.exports = {
  db,
};
