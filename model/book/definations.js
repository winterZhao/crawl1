const Sequelize = require('sequelize');
const table = 'book';

const fields = {
    id: {
        type:  Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type:  Sequelize.STRING,
        comment: '书名',
        allowNull: false,
    },
    author: {
        type: Sequelize.STRING,
        comment: '作者',
        allowNull: false,
    },
    categoryId: {
        type: Sequelize.STRING(20),
        comment: '栏目id',
        field: 'category_id',
        allowNull: false,
    },
    categoryName: {
        type: Sequelize.STRING(32),
        comment: '栏目名',
        field: 'category_name',
        allowNull: false,
    },
    pic: {
        type: Sequelize.STRING,
        comment: '缩略图链接',
        allowNull: true,
    },
    description: {
        type: Sequelize.STRING,
        comment: '描述',
        allowNull: true,
    },
    detail: {
        type: Sequelize.TEXT,
        comment: '其他',
        defaultValue:JSON.stringify({}),
        allowNull: false,
    },
    isDelete: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: '是否删除',
        field: 'is_delete'
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: '0:已完结,1:未完成',
        field: 'status'
    },
    contentDbName: {
        type: Sequelize.STRING(32),
        allowNull: false,
        field: 'content_db_name',
        comment: '内容在哪个表里'
    },
    originUrl: {
        type: Sequelize.STRING,
        allowNull:false,
        field: 'origin_url',
        comment: '从哪个网址爬的'
    },
    currentCrawlEle: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
        field: 'current_crawl_ele',
        comment: '最新爬取章节',
    },
    originListEle: {
        type: Sequelize.STRING(32),
        allowNull: false,
        field: 'origin_list_ele',
        comment: '列表页元素',
    },
    originDetailEle: {
        type: Sequelize.STRING(32),
        allowNull: false,
        field: 'origin_detail_ele',
        comment: '详情页内容元素',
    },
    originTitleEle: {
        type: Sequelize.STRING(32),
        allowNull: false,
        field: 'origin_detail_ele',
        comment: '详情页标题元素',
    },
    encoding: {
        type: Sequelize.STRING(10),
        allowNull: false,
        field: 'encoding',
        comment: '编码',
    },
    crawlHost: {
        type: Sequelize.STRING(10),
        allowNull: false,
        field: 'crawl_host',
        comment: '源url',
    },
    createTime: {
        type: Sequelize.DATE,
        comment: '创建时间',
        field: 'create_time',
        defaultValue: Sequelize.NOW,
        allowNull: false,
    },
    updateTime: {
        type: Sequelize.DATE,
        comment: '更新时间',
        field: 'update_time',
        defaultValue: Sequelize.NOW,
        allowNull: false,
    }
}

const option = {
    timestamps: true,
    freezeTableName: true,
    updatedAt: 'updateTime',
    createdAt: 'createTime'
}

module.exports = {
    table,
    fields,
    option,
}