import Users from './users';
import UsersOpenid from './../usersopenid/usersopenid';
import Articles from './../articles/articles';
import SysUsers from './../sysusers/sysusers';
import UsersVip from './../usersvip/usersvip';
import HousesComment from './../housescomment/housescomment';
import UsersAt from './../usersat/usersat';
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
export default Users;