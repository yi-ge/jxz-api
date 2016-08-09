/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('order_goods', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    activity_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    order_user_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    weixin_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    goods_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    goods_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    orderd_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: '0000-00-00 00:00:00'
    },
    get_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: '0000-00-00 00:00:00'
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
    contacts: {
      type: DataTypes.STRING,
      allowNull: true
    },
    contacts_phone: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    contacts_email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    integral: {
      type: DataTypes.INTEGER(9),
      allowNull: true
    }
  }, {
    tableName: 'order_goods'
  });
};
