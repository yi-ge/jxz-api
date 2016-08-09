/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('articles_comment', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    articles_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    comment_user_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    content: {
      type: DataTypes.STRING,
      allowNull: true
    },
    comment_date: {
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
    status: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      defaultValue: '1'
    }
  }, {
    tableName: 'articles_comment'
  });
};
