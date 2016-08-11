/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    account_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phone: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    six: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true
    },
    account_money: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    lock_money: {
      type: DataTypes.DECIMAL,
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
    },
    device_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    last_login_ip: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    last_login_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: '0000-00-00 00:00:00'
    },
    is_activate: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    set_type: {
      type: DataTypes.CHAR(6),
      allowNull: true
    },
    personalized: {
      type: DataTypes.STRING,
      allowNull: true
    },
    join_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: '0000-00-00 00:00:00'
    },
    integral: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    is_cover: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    passwd: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'users'
  });
};
