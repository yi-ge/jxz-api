import DataTypes from 'sequelize';
export default {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
    },
    houses_id: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    type: {
        type: DataTypes.INTEGER(4),
        allowNull: true
    },
    file_path: {
        type: DataTypes.STRING,
        allowNull: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true
    },
    links_url: {
        type: DataTypes.STRING,
        allowNull: true
    },
    show_location: {
        type: DataTypes.INTEGER(4),
        allowNull: true
    },
    sort_order: {
        type: DataTypes.INTEGER(6),
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