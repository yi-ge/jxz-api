import DataTypes from 'sequelize';
export default {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    order_user_id: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    order_user_phone: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    contacts: {
        type: DataTypes.STRING,
        allowNull: true
    },
    contacts_phone: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    contacts_email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    order_user_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    order_user_sex: {
        type: DataTypes.INTEGER(4),
        allowNull: true
    },
    order_status: {
        type: DataTypes.INTEGER(4),
        allowNull: true
    },
    cancel_opinion: {
        type: DataTypes.STRING,
        allowNull: true
    },
    finish_date: {
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
    city: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    region: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    status: {
        type: DataTypes.INTEGER(4),
        allowNull: true,
        defaultValue: '1'
    },
    order_remark: {
        type: DataTypes.STRING,
        allowNull: true
    },
    expect_order_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: '0000-00-00 00:00:00'
    },
    expect_houses_id: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    expect_houses_room: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    expect_houses_combo: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    expect_checkin_time: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: '0000-00-00 00:00:00'
    },
    expect_need_room_num: {
        type: DataTypes.INTEGER(4),
        allowNull: true
    },
    expect_checkin_day: {
        type: DataTypes.INTEGER(4),
        allowNull: true
    },
    expect_coin: {
        type: DataTypes.DECIMAL,
        allowNull: true
    },
    expect_order_date2: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: '0000-00-00 00:00:00'
    },
    houses_id: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    houses_room: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    houses_combo: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    checkin_time: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: '0000-00-00 00:00:00'
    },
    need_room_num: {
        type: DataTypes.INTEGER(4),
        allowNull: true
    },
    heckin_day: {
        type: DataTypes.INTEGER(4),
        allowNull: true
    },
    coin: {
        type: DataTypes.DECIMAL,
        allowNull: true
    },
    checkin_people_num: {
        type: DataTypes.INTEGER(9),
        allowNull: true
    }
};