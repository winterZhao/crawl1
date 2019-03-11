const _ = require('lodash');
const logger = require('./logger');
const obj = {
    arrayToObj(arr, name) {
        let obj = {};
        if ( Array.isArray(arr)) {
            for ( let i = 0; i < arr.length; i++ ) {
                let cur = arr[i];
                obj[cur[name]] = cur;
            }
        }
        return obj;
    },
    objToArray(obj) {
        let arr = [];
        if (_.isPlainObject(obj)) {
            for ( let key in obj ) {
                let value = obj[key];
                arr.push(value);
            }
        }
        return arr;
    },
    // 根据ua判断是pc还是mobile;
    judgetDevice(ua) {
        var model = 'pc';
        var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone"];
        for (var v = 0; v < Agents.length; v++) {
            if (ua.indexOf(Agents[v]) > 0) {
                model = 'phone';
               break;
            }
        }
        return {
            model
        }
    },
    // 随机数(时间戳)
    getRandom() {
        return new Date().getTime() + '_' +  (Math.random().toString().split('.')[1]);
    },
    // 抛出错误
    apiError(err,req,res) {
        logger.error(`remote_ip-${req.remote_ip};url:${req.url};query:${JSON.stringify(req.query)};params:${JSON.stringify(req.params)};body:${JSON.stringify(req.body)};error:${err.stack}`);
        res.send({result:1, errmsg: err.stack});
    },
    // 页面调用错误，报错，然后渲染500页面;
    renderError(err, req, res) {
        logger.error(`remote_ip-${req.remote_ip};url:${req.url};query:${JSON.stringify(req.query)};params:${JSON.stringify(req.params)};body:${JSON.stringify(req.body)};error:${err.stack}`);
        res.render('error');
    }
}

module.exports = obj;