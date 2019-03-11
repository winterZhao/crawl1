const Sequelize = require('sequelize');
const table = 'category';

const fields = {
    id: {
        type:  Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type:  Sequelize.STRING,
        comment: '栏目',
        allowNull: false,
    },
    url: {
        type:  Sequelize.STRING,
        comment: '链接',
        allowNull: false,
    },
    isDelete: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: '是否删除',
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