//路由渲染模板

const express = require('express');
const router = express.Router();
const servcie = require('../services/crawl');
const crontabService = require('../services/crawlCrontab');

// 第一次爬虫
router.post('/crawl/first', async function(req,res, next) {
    
    let body = req.body;
    let result = await servcie.crawlFirst(body);
    res.send({
        result:0,
        data: result,
    })
})

// 定时任务爬虫

router.get('/crawl/crontab', async function(req,res,next) {
    let result = await crontabService.crawlCrontab();
    res.send(result)
})


module.exports = router;
