import DataTypes from 'sequelize';
export default {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    from_user_id: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    content: {
        type: DataTypes.STRING,
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
    read_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: '0000-00-00 00:00:00'
    }
};