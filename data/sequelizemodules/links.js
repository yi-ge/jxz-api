/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('links', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    type: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    file_path: {
      type: DataTypes.STRING,
      allowNull: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true
    },
    links_url: {
      type: DataTypes.STRING,
      allowNull: true
    },
    sort_order: {
      type: DataTypes.INTEGER(6),
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
    tableName: 'links'
  });
};
