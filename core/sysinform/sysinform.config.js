import DataTypes from 'sequelize';
export default {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
    },
    type: {
        type: DataTypes.INTEGER(4),
        allowNull: true
    },
    classify: {
        type: DataTypes.INTEGER(6),
        allowNull: true
    },
    info_level: {
        type: DataTypes.INTEGER(4),
        allowNull: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true
    },
    content: {
        type: DataTypes.STRING,
        allowNull: true
    },
    url: {
        type: DataTypes.STRING,
        allowNull: true
    },
    send_user: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    receive_user: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    send_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: '0000-00-00 00:00:00'
    },
    read_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: '0000-00-00 00:00:00'
    },
    read_status: {
        type: DataTypes.INTEGER(4),
        allowNull: true,
        defaultValue: '0'
    },
    status: {
        type: DataTypes.INTEGER(4),
        allowNull: true
    }
};