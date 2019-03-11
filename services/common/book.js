const model = require('../../model/book')
const _ = require('lodash');
const obj = {
    async getPageList(opt) {
        let where = {isDelete:0};
        if ( opt.where) opt.where = _.defaults(opt.where, where);
        opt = _.defaults(opt, {raw: true});
        return await model.findAndCount(opt);
    },
    async getById(id) {
        return await model.findById(id,{raw:true});
    },
    async getAll(opt) {
        let where = {isDelete:0};
        if ( opt.where) opt.where = _.defaults(opt.where, where);
        opt = _.defaults(opt, {raw: true});
        return await model.findAll(opt); 
    },
    async count(opt) {
        opt = _.defaults(opt, {raw: true});
        return await model.count(opt);
    },
    async add(opt) {
        opt = _.defaults(opt, {raw: true});
        return await model.create(opt);
    },
    async update(values, opt) {
        opt = _.defaults(opt, {raw: true});
        return await model.update(values,opt);
    }
}










module.exports = obj;