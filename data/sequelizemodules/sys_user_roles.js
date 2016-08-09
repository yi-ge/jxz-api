/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sys_user_roles', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    role_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  }, {
    tableName: 'sys_user_roles'
  });
};
