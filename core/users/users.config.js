import DataTypes from 'sequelize';
export default {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
    },
    account_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    phone: {
        type: DataTypes.BIGINT,
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
    },
    device_id: {
        type: DataTypes.STRING,
        allowNull: true
    },
    last_login_ip: {
        type: DataTypes.INTEGER(10),
        allowNull: true
    },
    last_login_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: '0000-00-00 00:00:00'
    },
    is_activate: {
        type: DataTypes.INTEGER(4),
        allowNull: true
    },
    personalized: {
        type: DataTypes.STRING,
        allowNull: true
    },
    join_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: '0000-00-00 00:00:00'
    },
    user_vip_id: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    user_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    sex: {
        type: DataTypes.INTEGER(4),
        allowNull: true,
        defaultValue: '2'
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: true
    }
};