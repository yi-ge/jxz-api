/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users_integral_log', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    event_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    event_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    event_type: {
      type: DataTypes.INTEGER(9),
      allowNull: true
    },
    event_source: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    integral: {
      type: DataTypes.INTEGER(9),
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
    tableName: 'users_integral_log'
  });
};
