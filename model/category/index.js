/**
 * 栏目
 */
const sequelize = require('../conn');
const definations = require('./definations');
const moment = require('../../util/moment');

const model = sequelize.define(
    definations.table, 
    definations.fields,
    definations.option
)

model.addHook('afterFind', function(data, option) {
    if ( Array.isArray(data)) {
        data.forEach((item) => {
            item.createTime = moment(item.createTime).format('LL');
            item.updateTime = moment(item.updateTime).format('LL');
        })
    } else {
        data.createTime = moment(data.createTime).format('LL');
        data.updateTime = moment(data.updateTime).format('LL');
    }
})

// sequelize.sync({force:true});
module.exports = model;