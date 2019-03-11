const cfg = require('../config/index');
const rp = require('request-promise');
const cheerio = require('cheerio');
const request = require('request');
const bookService = require('./common/book');
const ContentService = require('./common/content');
const iconv = require('iconv-lite')
const encoding = require('encoding');
process.env.UV_THREADPOOL_SIZE = 128;

const obj = {
    async crawlCrontab() {
        let opt = {
            where: {
                status: 1,
            },
            // attributes: ["id","originUrl","originListEle","originDetailEle","currentCrawlEle","encoding"],
        }
        let result_arr = await bookService.getAll(opt);
        
        for ( let i = 0, r = result_arr.length; i < r; i++ ) {
            let cur = result_arr[i];
            let {name,categoryName,categoryId,contentDbName,originUrl,encoding,currentCrawlEle, originListEle, originDetailEle,crawlHost } = cur;
            let bookId = cur.id;
            let buf = await this.defferReq(originUrl);
            let data = '';
            if ( encoding.includes('gbk')) {
                data = iconv.decode(buf, 'GBK');
            } else {
                data = iconv.decode(buf, 'utf8');
            }
          
            let $ = cheerio.load(data,{ decodeEntities: false });
            let elements = $(originListEle).slice(currentCrawlEle);
            if (elements.length > 0 ) {
                for ( let j = 0, k = elements.length; j < k ;j++ ) {
                    let item  = elements[j];
                    let chapter = `${item.children[0].data}`;
                    let u = item.attribs.href;
                    let url = '';
                    if ( u.startsWith('/')) {
                        url = `${crawlHost}${u}`;
                    } else if ( u.startsWith('http')) {
                        url = u;
                    } else {
                        url = `${originUrl}${u}`;
                    }
                    // console.log(url);
                    let buf = await this.defferReq(url);
                    let data = '';
                    if ( encoding.includes('gbk')) {
                        data = iconv.decode(buf, 'GBK');
                    } else {
                        data = iconv.decode(buf, 'utf8');
                    }
                    let $ = cheerio.load(data,{ decodeEntities: false });
                    let content = $(originDetailEle).html();
                    if ( content ) {
                        content = content.replace(/<script>readx\(\);<\/script>/g,'')
                        content = content.replace(/<script>chaptererror\(\);<\/script>/g,'')
                        content = content.replace(/\(《》\)/g,'')
                        let downloadContent = content.replace(/<br\/?>/g,'\r\n');
                        
                        await this.saveContent({bookName:name,categoryName,categoryId,dbName:contentDbName,bookId,chapter, content,downloadContent});  
                        currentCrawlEle = currentCrawlEle + 1;
                        console.log(`${name}:${currentCrawlEle}`)
                        await this.updateBook({bookId, startNum:currentCrawlEle})
                    } else {
                        break;
                    }
                }
            } else {
                continue;
            }
        }
        return "ok";
        
    },
    async updateBook({bookId, startNum}) {
        let opt = {
            where: {
                id: bookId,
            }
            
        }
        let value = {currentCrawlEle: startNum};
        return await bookService.update(value, opt)
    },
    async saveContent({bookName,categoryName,categoryId,dbName,bookId,chapter, content,downloadContent}) {
        let contentService = new ContentService(dbName)
        return await contentService.add({name:bookName,categoryName,categoryId,dbName,bookId,chapter, content,downloadContent})
    },
    async defferReq(url) {
        return new Promise(async function(resolve, reject) {
            setTimeout(async function() {
                let opt = {
                    url,
                    headers: {
                        "User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36"
                    },
                    timeout: 20000,
                    forever: true,
                    encoding: null,
                    rejectUnauthorized: false,
                    
                }
                request(opt, async function(err, response, body) {
                    if ( err) {
                        console.log(err);
                        reject(err)
                    } else {
                        resolve(body);
                    }
                })
            }, 3000)
        })
    },
}


module.exports = obj;