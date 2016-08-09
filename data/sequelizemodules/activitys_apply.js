/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('activitys_apply', {
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
  }, {
    tableName: 'activitys_apply'
  });
};
