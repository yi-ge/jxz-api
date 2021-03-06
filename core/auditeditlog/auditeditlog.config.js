import DataTypes from 'sequelize';
export default {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
    },
    event_type: {
        type: DataTypes.INTEGER(4),
        allowNull: true
    },
    event_module: {
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
    eventer: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    event_module_id: {
        type: DataTypes.BIGINT,
        allowNull: true
    }
};