/**
 * 栏目
 */
const sequelize = require('../conn');
const definations = require('./definations');
const moment = require('../../util/moment');
// const bookList = require('../../config/book_list');

// let obj = {};

// for ( let i = 0, r = bookList.length; i < r; i++ ) {
//     let dbName = bookList[i].dbName;
//     if ( !obj[dbName] ) {
//         let model = sequelize.define(
//             dbName, 
//             definations.fields,
//             definations.option
//         )
        
//         model.addHook('afterFind', function(data, option) {
//             if ( Array.isArray(data)) {
//                 data.forEach((item) => {
//                     item.createTime = moment(item.createTime).format('LL');
//                     item.updateTime = moment(item.updateTime).format('LL');
//                 })
//             } else {
//                 data.createTime = moment(data.createTime).format('LL');
//                 data.updateTime = moment(data.updateTime).format('LL');
//             }
//         })
//         obj[dbName] = model;
//     }
// }

let obj = {};



// module.exports = obj;

module.exports = function(dbName) {
    if ( !obj[dbName] ) {
        let model = sequelize.define(
            dbName, 
            definations.fields,
            definations.option
        )
        model.sync();
        model.addHook('afterFind', function(data, option) {
            if ( Array.isArray(data)) {
                data.forEach((item) => {
                    if(item.createTime) item.createTime = moment(item.createTime).format('LL');
                    if(item.updateTime) item.updateTime = moment(item.updateTime).format('LL');
                })
            } else {
                if(data.createTime) data.createTime = moment(data.createTime).format('LL');
                if(data.updateTime) data.updateTime = moment(data.updateTime).format('LL');
            }
        })
        obj[dbName] = model;
    }
    return obj;
}

