/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('links_location', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    links_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    location: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    tableName: 'links_location'
  });
};
