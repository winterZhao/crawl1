const rp = require('request-promise');
const cheerio = require('cheerio');
const request = require('request');
const co = require('co');
const iconv = require('iconv-lite')

co(function*() {
    let data = yield rp('https://www.x4399.com/book/2978/1505284.html');
    data = iconv.decode(data, 'gbk')
    var $ = cheerio.load(data);
    let tex = $('#content').html();
    console.log(tex);
})