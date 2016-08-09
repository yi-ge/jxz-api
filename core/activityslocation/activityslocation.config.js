import DataTypes from 'sequelize';
export default {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
    },
    activitys_id: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    location: {
        type: DataTypes.INTEGER(4),
        allowNull: true
    }
};