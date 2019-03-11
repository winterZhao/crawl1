// https://www.sbkk88.com/mingzhu/gudaicn/zengguofanjiashu/



// const commonArticle = require('./common/article');
// const commonContent = require('./common/content');
// const categoryService = require('./category');
// const link = require('./link');
// const tool = require('./util/tool');
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
    async crawlFirst(body) {
        try {
            let result = await this.getBookData(body);
            return 'ok';
        } catch (e) {
            console.log(e.stack);
            return `${e.stack}`;
        }
        
    },
    async getBookData() {

        // 自定义开始
        let bookId = 73;
        
        let name = '曾国藩家书';
        let contentDbName = 'zengguofanjiashu';
        let categoryId = 'mingzhutuijian';
        let categoryName = '名著推荐'
        let author = "辰东";
        let pic = '/upload/zhetian.jpg';
        let description = "    冰冷与黑暗并存的宇宙深处，九具庞大的龙尸拉着一口青铜古棺，亘古长存。这是太空探测器在枯寂的宇宙中捕捉到的一幅极其震撼的画面。九龙拉棺，究竟是回到了上古，还是来到了星空的彼岸？一个浩大的仙侠世界，光怪陆离，神秘无尽。热血似火山沸腾，激情若瀚海汹涌，欲望如深渊无止境……<br/>登天路，踏歌行，弹指遮天。";
        let status = 0;
        
        // let originListEle = "#toukuizhe a";
        // let originDetailEle = ".describe-html";
        let originListEle = ".leftList a";
        let originDetailEle = "#f_article";
        let currentCrawlEle = 0;
        let url = 'https://www.sbkk88.com/mingzhu/gudaicn/zengguofanjiashu/';
        let crawlEncoding = 'gbk';
        let crawlHost = "https://www.sbkk88.com";
        // 自定义结束
             
        let _self = this;
        let originUrl = url;
        let buf = await this.defferReq(url);
        let data = '';
        if ( crawlEncoding.includes('gbk')) {
            // console.log('12')
            data = iconv.decode(buf, 'GBK');
        } else {
            data = iconv.decode(buf, 'utf8');
        }
        // console.log(data);
        var $ = cheerio.load(data,{ decodeEntities: false });
        let elements = [];
        // let listResult = await this.saveBook({name,categoryName,categoryId,author,pic,description, contentDbName,originUrl,originListEle,originTitleEle,currentCrawlEle, originDetailEle})
        // let bookId = listResult.id;
        
        
        elements = $(originListEle).slice(currentCrawlEle);
        for ( let i = 0, r = elements.length; i < r; i++ ) {
            let item = elements[i];
            
            let chapter = `${item.children[0].data}`;
            let u = item.attribs.href;
            let url = '';
            if ( u.startsWith('/')) {
                url = `${crawlHost}${u}`;
            } else if (u.startsWith('http')){
                url = u;
            } else {
                url = `${crawlHost}${u}`;
            }
            console.log(url);
            let buf = await _self.defferReq(url);
            // console.log(buf.toString())
            let data = '';
            if ( crawlEncoding.includes('gbk')) {
                // console.log('12')
                data = iconv.decode(buf, 'GBK');
            } else {
                data = iconv.decode(buf, 'utf8');
            }
            let $ = cheerio.load(data,{ decodeEntities: false });
            let content = $(originDetailEle).html();
            // console.log(content);
            // console.log(originDetailEle)
            content = content.replace('<script src="http://www.sbkk8.cn/cn/b_content_flospant.js" type="text/javascript"></script>','');
            content = content.replace(/a/g,'span')
            content = content.replace('<img src="http://www.sbkk8.cn/imspanges/dspanshspanng/qiu.jpg" id="demoBtn1">','')
            content = content.replace('//www.sbkk88.com/cn/cn_9601.js','');
            content = content.replace('/mingzhu/waiguowenxuemingzhu/hongyuhei/','javascript:;');
            content = content.replace(/mingzhu\/gudspanicn\/zengguofspannjispanshu\/\d+\.html/g,'');
            content =content.replace('<script src="http://cpro.bspanidustspantic.com/cpro/ui/c.js"  type="text/javascript"></script>','');
            
            // content = content.replace('<a href="/mingzhu/waiguowenxuemingzhu/hongyuhei/" title="红与黑" class="returnIndex">【回目录】</a>', '');
            // content = content.replace(/<a href="\/mingzhu\/waiguowenxuemingzhu\/hongyuhei\/\d+\.html"  class="prevPage">上一篇<b>：.*<\/b><\/a>/g, '');
            // content = content.replace(/<a href="\/mingzhu\/waiguowenxuemingzhu\/hongyuhei\/\d+\.html"  class="nextPage">.*<\/b><\/a>/g, '');
            content = content.replace('<div class="c"></div>','');
            content = content.replace('<p>微信搜索关注 <b class="tt"><a href="http://www.luoxia.com/theme/tt/" target="_blank">落霞小说</a></b> 公众号，更多优质精校小说免费看！</p>',"");
            content = content.replace('<a href="http://www.Biqugew.Com" target="_blank">www.Biqugew.Com</a>', '');
            content = content.replace('https://www.biquger.com','/');
            content = content.replace('<a href="/biquge/4824/">https://www.biquger.com/biquge/4824/</a>' ,'')
            content = content.replace(/<div id="ggadright">.*<\/div>/g,'');
            // <script>mobile_go();</script>
            content = content.replace('<script>mobile_go();</script>', '');
            content = content.replace(/笔.趣.阁/g,"");
            content = content.replace(/www。biquke。com/g,"");
            content = content.replace(/\(%网%\)/g, '')
            content = content.replace(/https:\/\/www.qb5200.tw\/xiaoshuo\/12\/12521\/\d+\.html/g,'')
            content = content.replace(/https:\/\/www.biqiuge.com\/book\/4772\/\d+\.html/g,'')
            content = content.replace(/ＷＷＷ．ＢＩＱＵＫＥ．ＣＯＭ/g,'')
            content = content.replace(/www．biquke．com/g,'');
            content = content.replace(/www.qb5200.tw/g, 'www.sixstone.top')
            content = content.replace(/m.qb5200.tw/g, 'm.sixstone.top')
            content = content.replace(/全本小说网/g, '六石小说网')
            content = content.replace(/www.biqiuge.com/g,'www.sixstone.top');
            content = content.replace(/m.biqiuge.com/g,'m.sixstone.top');
            content = content.replace(/笔趣阁/g,'六石小说网')
            content = content.replace(/<script>readx\(\);<\/script>/g,'')
            content = content.replace(/<script>chaptererror\(\);<\/script>/g,'')
            content = content.replace(/\(《》\)/g,'')
            content = content.replace(/http:\/\/m.xbiquge.la/g,'http://m.sixstone.top')
            content = content.replace(/http:\/\/koubei.baidu.com\/s\/xbiquge.la/g,'javascript:;')
            let downloadContent = content.replace(/<br\/?>/g,'\r\n');
            // downloadContent = downloadContent.replace(/<br\/>/g,'\r\n')
            // content = content.replace("高速文字首发 www.x4399.com 手机同步阅读 wap.x4399.com    ……","")
            await _self.saveContent({bookName:name,categoryName,categoryId,dbName:contentDbName,bookId,chapter, content,downloadContent});  
            // currentCrawlEle++ 
        }
        console.log('done');
        let startNum = currentCrawlEle + elements.length;
        return await _self.updateBook({bookId, startNum})
    },
    async saveBook({name,categoryName,categoryId,author,pic,description, contentDbName,originUrl,originListEle,originTitleEle,currentCrawlEle, originDetailEle}) {
        return await bookService.add({name,categoryName,categoryId,author,pic,description, contentDbName,originUrl,originListEle,originTitleEle,currentCrawlEle, originDetailEle})
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
            }, 2000)
        })
    },
}


module.exports = obj;