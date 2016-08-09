/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('houses_combo', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    houses_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    combo_begin_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: '0000-00-00 00:00:00'
    },
    combo_desc: {
      type: DataTypes.STRING,
      allowNull: true
    },
    combo_end_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: '0000-00-00 00:00:00'
    },
    status: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      defaultValue: '1'
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: '0000-00-00 00:00:00'
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: '0000-00-00 00:00:00'
    },
    modifier: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    creater: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    tableName: 'houses_combo'
  });
};
