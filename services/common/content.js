const model = require('../../model/content')
const _ = require('lodash');

class _M {
    constructor(dbName) {
        let obj = model(dbName);
        this.model = obj[dbName];
    }
    async getById(id) {
        return await model.findById(id,{raw:true});
    }
    async getByBookId(bookId) {
        return await this.model.findAll({
            where: {
                bookId,
                isDelete: 0
            },
            raw: true
        })
    }
    async add(opt) {
        opt = _.defaults(opt, {raw: true});
        return await this.model.create(opt);
    }
}

module.exports = _M;