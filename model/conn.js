const cfg = require('../config');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(cfg.database, cfg.user, cfg.password, {
  host: cfg.host,
  port: cfg.port || 3306,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

module.exports = sequelize;