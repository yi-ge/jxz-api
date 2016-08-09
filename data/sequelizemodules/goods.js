/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('goods', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    goods_type: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    goods_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    goods_desc: {
      type: DataTypes.STRING,
      allowNull: true
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    need_integral: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    stock_num: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    stock_lock_num: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    sell_num: {
      type: DataTypes.INTEGER(11),
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
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: true
    },
    picture2: {
      type: DataTypes.STRING,
      allowNull: true
    },
    picture3: {
      type: DataTypes.STRING,
      allowNull: true
    },
    picture4: {
      type: DataTypes.STRING,
      allowNull: true
    },
    picture5: {
      type: DataTypes.STRING,
      allowNull: true
    },
    picture6: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'goods'
  });
};
