/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('houses_room_price', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    houses_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    houses_room_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    season: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    price_desc: {
      type: DataTypes.STRING,
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
    tableName: 'houses_room_price'
  });
};
