const Sequelize = require('sequelize');
const table = 'content';

const fields = {
    id: {
        type:  Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    bookId: {
        type:  Sequelize.STRING,
        comment: '书id',
        field: 'book_id',
        allowNull: false,
    },
    chapter: {
        type:  Sequelize.STRING,
        comment: '章节',
        field: 'chapter',
        allowNull: false,
    },
    content: {
        type: Sequelize.TEXT,
        comment: '内容',
        allowNull: false,
    },
    downloadContent: {
        type: Sequelize.TEXT,
        comment: '下载内容',
        allowNull: false,
        field: 'download_content',
    },
    isDelete: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
        comment: '是否删除',
        field: 'is_delete'
    },
    name: {
        type:  Sequelize.STRING,
        comment: '小说名',
        field: 'book_name',
        allowNull: false,
    },
    categoryName: {
        type:  Sequelize.STRING,
        comment: '栏目名',
        field: 'category_name',
        allowNull: false,
    },
    categoryId: {
        type:  Sequelize.STRING,
        comment: '栏目id',
        field: 'category_id',
        allowNull: false,
    },
    dbName: {
        type:  Sequelize.STRING,
        comment: '数据库名',
        field: 'db_name',
        allowNull: false,
    },
    createTime: {
        type: Sequelize.DATE,
        comment: '创建时间',
        field: 'create_time',
        defaultValue: Sequelize.NOW
    },
    updateTime: {
        type: Sequelize.DATE,
        comment: '更新时间',
        field: 'update_time',
        defaultValue: Sequelize.NOW
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