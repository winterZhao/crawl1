const model = require('../../model/link')
const _ = require('lodash');
const obj = {
    async getAll() {
        return await model.findAll({
            where: {
                isDelete: 0
            },
            raw:true
        });
    },
    async add(opt) {
        opt = _.defaults(opt, {raw: true});
        return await model.create(opt);
    },
    async delById(id) {
        let val = {
            isDelete: 1
        }
        let opt = {
            where: {
                id,
            },
        }
        return await model.update(val, opt);
    }
}

module.exports = obj;


