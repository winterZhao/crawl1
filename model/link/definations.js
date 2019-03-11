const Sequelize = require('sequelize');
const table = 'link';

const fields = {
    id: {
        type:  Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type:  Sequelize.STRING,
        allowNull: false,
        comment: '友链文字',
    },
    url: {
        type:  Sequelize.STRING,
        allowNull: false,
        comment: '友链url',
    },
    isDelete: {
        type:  Sequelize.INTEGER,
        comment: '是否删除',
        defaultValue: 0,
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