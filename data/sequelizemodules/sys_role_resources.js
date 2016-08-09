/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sys_role_resources', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    role_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    resource_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    permissions: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'sys_role_resources'
  });
};
