/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('activitys_location', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    activitys_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    location: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    }
  }, {
    tableName: 'activitys_location'
  });
};
