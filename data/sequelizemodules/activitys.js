/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('activitys', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    activity_type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    activity_banner: {
      type: DataTypes.STRING,
      allowNull: true
    },
    activity_title: {
      type: DataTypes.STRING,
      allowNull: true
    },
    activity_begin_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: '0000-00-00 00:00:00'
    },
    activity_end_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: '0000-00-00 00:00:00'
    },
    apply_begin_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: '0000-00-00 00:00:00'
    },
    apply_end_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: '0000-00-00 00:00:00'
    },
    activity_desc: {
      type: DataTypes.STRING,
      allowNull: true
    },
    sort_order: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    link_url: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER(4),
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
    }
  }, {
    tableName: 'activitys'
  });
};
