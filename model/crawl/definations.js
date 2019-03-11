const Sequelize = require('sequelize');
const table = 'crawl';

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
    url: {
        type: Sequelize.TEXT,
        comment: '内容',
        allowNull: false,
    },
    list_element: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: '列表页元素',
        field: 'is_delete'
    },
    detail_element: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: '内容',
        field: 'is_delete'
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