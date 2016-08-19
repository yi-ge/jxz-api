/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('houses', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    type: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    nation: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    region: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    city: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    orientation: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    longitude: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    latitude: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    favorite_nums: {
      type: DataTypes.INTEGER(11),
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
    is_putaway: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    spots_around: {
      type: DataTypes.STRING,
      allowNull: true
    },
    traffic_around: {
      type: DataTypes.STRING,
      allowNull: true
    },
    houses_desc: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      defaultValue: '1'
    },
    comment_num: {
      type: DataTypes.INTEGER(9),
      allowNull: true
    },
    is_orders: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    article_num: {
      type: DataTypes.INTEGER(9),
      allowNull: true
    }
  }, {
    tableName: 'houses'
  });
};
