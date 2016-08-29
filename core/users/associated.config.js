import Users from './users';
import UsersOpenid from './../usersopenid/usersopenid'; //第三方
import Articles from './../articles/articles'; //文章
import SysUsers from './../sysusers/sysusers';  // 系统用户
import UsersVip from './../usersvip/usersvip'; // vip用户
import HousesComment from './../housescomment/housescomment'; //评论酒店
import UsersAt from './../usersat/usersat'; // 关注用户
import UsersFavorite from './../usersfavorite/usersfavorite'; // 关注 点赞文章
import ArticlesComment from './../articlescomment/articlescomment'; //文章评论
import UsersMsg from './../usersmsg/usersmsg'; //用户私信
//一个用户对应一个openid
Users.sequlize.hasOne(UsersOpenid.sequlize, {
    foreignKey: "user_id"
});
//一个用户对应多篇文章
Users.sequlize.hasMany(Articles.sequlize, {foreignKey: 'author'});
//房屋评论创建人
Users.sequlize.hasMany(HousesComment.sequlize,{
    foreignKey:'creater'
});
//文章创建者
Users.sequlize.hasMany(Articles.sequlize,{
   foreignKey:'creater'
});
//文章修改者
Users.sequlize.hasMany(Articles.sequlize,{
    foreignKey:'modifier'
});
//房屋评论修改人
Users.sequlize.hasMany(HousesComment.sequlize,{
    foreignKey:'modifier'
});
//一个用户在sys_users表中存在一个外键
Users.sequlize.hasOne(SysUsers.sequlize, {
    foreignKey: 'users_id',
});
//用户管理vip 外键存在于Users中
Users.sequlize.belongsTo(UsersVip.sequlize, {foreignKey: 'user_vip_id', targetKey: 'id'});

//关注别人
Users.sequlize.belongsToMany(Users.sequlize,{
    through:UsersAt.sequlize,
    foreignKey:'users_id',
    otherKey:'at_user_id',
    as:'at_user'
});
//被别人关注
Users.sequlize.belongsToMany(Users.sequlize,{
    through:UsersAt.sequlize,
    foreignKey:'at_user_id',
    otherKey:'users_id',
    as:'users_at'
});
//收藏文章
Users.sequlize.belongsToMany(Articles.sequlize,{
    through:UsersFavorite.sequlize,
    foreignKey:'user_id',
    otherKey:'favorite_source_id',
    as:'favorite_article',
});
//点赞文章
Users.sequlize.belongsToMany(Articles.sequlize,{
    through:UsersFavorite.sequlize,
    foreignKey:'user_id',
    otherKey:'favorite_source_id',
    as:'like_article',
});
//用户关联多个文章评论
Users.sequlize.hasMany(ArticlesComment.sequlize,{
    foreignKey:'comment_user_id',
});
//给其他人发私信
Users.sequlize.hasMany(UsersMsg.sequlize,{
   foreignKey:'user_id',
    as:'sponsored_msg'
});
//接收其他人私信
Users.sequlize.hasMany(UsersMsg.sequlize,{
    foreignKey:'user_id',
    as:'receive_msg'
});
export default Users;