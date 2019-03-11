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
            if(item.createTime) item.createTime = moment(item.createTime).format('LL');
            if(item.updateTime)  item.updateTime = moment(item.updateTime).format('LL');
            // item.detail = JSON.parse(item.detail);
        })
    } else {
        if(data.createTime)  data.createTime = moment(data.createTime).format('LL');
        if(data.updateTime)  data.updateTime = moment(data.updateTime).format('LL');
        // data.detail = JSON.parse(data.detail);
    }
})

// sequelize.sync({force:true});
module.exports = model;