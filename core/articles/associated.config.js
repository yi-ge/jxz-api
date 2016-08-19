import Articles from './articles';
import Users from './../users/users';
import Houses from './../houses/houses';
//一篇文章对应一个作者
Articles.sequlize.belongsTo(Users.sequlize, {
    foreignKey: "author",
    targetKey: "id"
});
//创建人
Articles.sequlize.belongsTo(Users.sequlize, {
    foreignKey: "creater",
    targetKey: "id",
    as:'creater_user'
});
//修改人
Articles.sequlize.belongsTo(Users.sequlize, {
    foreignKey: "modifier",
    targetKey: "id",
    as:'modifier_user'
});
//一篇文章对应一个酒店
Articles.sequlize.belongsTo(Houses.sequlize, {
    as: 'houses',
    foreignKey: 'houses_id',
    targetKey: 'id'
});
export default Articles;