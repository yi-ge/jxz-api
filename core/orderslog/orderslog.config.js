import DataTypes from 'sequelize';
export default {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
    },
    order_id: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    event_type: {
        type: DataTypes.INTEGER(4),
        allowNull: true
    },
    event_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    event_content: {
        type: DataTypes.STRING,
        allowNull: true
    },
    event_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: '0000-00-00 00:00:00'
    },
    event_user_id: {
        type: DataTypes.BIGINT,
        allowNull: true
    }
};