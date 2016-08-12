import DataTypes from 'sequelize';
export default {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
    },
    role_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    resource_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    permissions: {
        type: DataTypes.STRING,
        allowNull: true
    }
};