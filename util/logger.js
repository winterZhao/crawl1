const log4js = require("log4js");
const cfg = require('../config/index');
const logConf = require('../config/log4js.json');
log4js.configure(logConf);

const logger = log4js.getLogger('log');

module.exports = logger;