import Articles from './articles';
import Users from './../users/users';
import Houses from './../houses/houses';
import UsersFavorite from './../usersfavorite/usersfavorite';
import ArticlesComment from './../articlescomment/articlescomment';

//一篇文章对应一个作者
Articles.sequlize.belongsTo(Users.sequlize, {
    foreignKey: "author",
    targetKey: "id",
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
    foreignKey: 'houses_id',
    targetKey: 'id',
    as: 'houses'
});
//文章被收藏
Articles.sequlize.belongsToMany(Users.sequlize,{
    through:UsersFavorite.sequlize,
    as:'favorite_user',
    foreignKey:'favorite_source_id',
    otherKey:'user_id'
});
//文章被点赞
Articles.sequlize.belongsToMany(Users.sequlize,{
    through:UsersFavorite.sequlize,
    as:'like_user',
    foreignKey:'favorite_source_id',
    otherKey:'user_id'
});
//文章对应多个评论
Articles.sequlize.hasMany(ArticlesComment.sequlize,{
    foreignKey:'articles_id',
    targetKey:'id'
});
export default Articles;