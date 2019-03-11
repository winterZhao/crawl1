没有文章列表页(第一章,第二章这种;)

socket hangup      设置timeout

ESOCKETTIMEDOUT
    process.env.UV_THREADPOOL_SIZE = 128;
    forever: true

Client network socket disconnected before secure TLS connection was established

agent: false,
pool: {maxSockets: Infinity}









http://www.purepen.com/index.html

            request: encoding:null,
            let data = '';
            if ( crawlEncoding.includes('gbk')) {
                // console.log('12')
                data = iconv.decode(buf, 'GBK');
            } else {
                data = iconv.decode(buf, 'utf8');
            }
            let $ = cheerio.load(data,{ decodeEntities: false });