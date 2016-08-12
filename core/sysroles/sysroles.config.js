import DataTypes from 'sequelize';
export default {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    role_desc: {
        type: DataTypes.STRING,
        allowNull: true
    },
    set_type: {
        type: DataTypes.CHAR(6),
        allowNull: true
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
    },
    status: {
        type: DataTypes.INTEGER(4),
        allowNull: true,
        defaultValue: '1'
    }
};