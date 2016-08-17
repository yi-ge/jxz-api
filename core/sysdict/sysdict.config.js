import DataTypes from 'sequelize';
export default {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    code: {
        type: DataTypes.STRING,
        allowNull: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    type: {
        type: DataTypes.INTEGER(5),
        allowNull: true
    },
    parent_code: {
        type: DataTypes.STRING,
        allowNull: true
    },
    parent_id: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    level: {
        type: DataTypes.INTEGER(4),
        allowNull: true
    },
    sort_order: {
        type: DataTypes.INTEGER(4),
        allowNull: true
    },
    status: {
        type: DataTypes.INTEGER(4),
        allowNull: true,
        defaultValue: '1'
    },
    creater: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    modifier: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: '0000-00-00 00:00:00'
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: '0000-00-00 00:00:00'
    }
};