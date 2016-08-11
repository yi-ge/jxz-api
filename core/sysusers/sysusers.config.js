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
    user_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    phone: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    sex: {
        type: DataTypes.INTEGER(4),
        allowNull: true,
        defaultValue: '2'
    },
    city: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    region: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    head_portrait: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    info_integrity: {
        type: DataTypes.INTEGER(4),
        allowNull: true,
        defaultValue: '0'
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
    post_roles: {
        type: DataTypes.BIGINT,
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
    passwd: {
        type: DataTypes.STRING,
        allowNull: true
    }
};