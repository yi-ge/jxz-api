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
    season: {
        type: DataTypes.INTEGER(4),
        allowNull: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    solar_terms_begin_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: '0000-00-00 00:00:00'
    },
    solar_terms_end_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: '0000-00-00 00:00:00'
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
    is_set_price: {
        type: DataTypes.INTEGER(4),
        allowNull: true
    }
};