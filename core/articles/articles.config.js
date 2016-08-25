import DataTypes from 'sequelize';
export default {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
    },
    category_id: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    houses_id: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    author_type: {
        type: DataTypes.INTEGER(4),
        allowNull: true
    },
    author: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    check_status: {
        type: DataTypes.INTEGER(4),
        allowNull: true
    },
    check_cause: {
        type: DataTypes.STRING,
        allowNull: true
    },
    check_user_id: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    check_date: {
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
    is_off: {
        type: DataTypes.INTEGER(4),
        allowNull: true
    },
    read_num: {
        type: DataTypes.INTEGER(11),
        allowNull: true
    },
    cover_picture: {
        type: DataTypes.STRING,
        allowNull: true
    },
    at_num: {
        type: DataTypes.INTEGER(11),
        allowNull: true
    },
    like_num: {
        type: DataTypes.INTEGER(11),
        allowNull: true
    }
};