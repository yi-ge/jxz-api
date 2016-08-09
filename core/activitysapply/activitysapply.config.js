import DataTypes from 'sequelize';
export default {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
    },
    activity_id: {
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
    email: {
        type: DataTypes.STRING,
        allowNull: true
    }
};