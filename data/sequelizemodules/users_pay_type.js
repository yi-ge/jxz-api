/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users_pay_type', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    type: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pay_no: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pay_name_id: {
      type: DataTypes.BIGINT,
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
  }, {
    tableName: 'users_pay_type'
  });
};
