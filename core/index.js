/**
 * Created by NX on 2016/8/8.
 */
import Users from './users';
import UsersVip from './UsersVip';
import SysUsers from './sysusers';
import SysRoles from './sysroles';
import SysResources from './sysresources';
import SysDict from './sysdict';
import SysHotKeyword from './syshotkeyword';
import SysRoleResources from './sysroleresources';
import SysUserRoles from './sysuserroles';
import Activitys from './activitys';
import ActivitysApply from './activitysapply';
import ActivitysLocation from './activityslocation';
import UsersOpenid from './usersopenid';
import UserOauthOpenid from './useroauthopenid';
import Articles from './articles';
import Houses from './houses';

// 设置关联关系

//一个用户对应一个openid
Users.sequlize.hasOne(UsersOpenid.sequlize, {
    foreignKey: "user_id"
});
//一个openid对应一个用户 外键存在于user_oauth_openid中 为user_id
UsersOpenid.sequlize.belongsTo(Users.sequlize, {
    foreignKey: "user_id",
    targetKey: "id"
});


//一个用户对应多篇文章
Users.sequlize.hasMany(Articles.sequlize, {foreignKey: 'author'});
//一篇文章对应一个作者
Articles.sequlize.belongsTo(Users.sequlize, {
    foreignKey: "author",
    targetKey: "id"
});

//一个用户在sys_users表中存在一个外键
Users.sequlize.hasOne(SysUsers.sequlize, {
    foreignKey: 'users_id',
});
SysUsers.sequlize.belongsTo(Users.sequlize, {
    foreignKey: 'users_id',
    targetKey: 'id',
});

//用户创建多个字典
SysUsers.sequlize.hasMany(SysDict.sequlize, {
    foreignKey: 'creater',
});
//字典关联一个用户
SysDict.sequlize.belongsTo(SysUsers.sequlize, {
    foreignKey: 'creater',
    targetKey: 'id',
});

//字典表自关联自己
SysDict.sequlize.hasMany(SysDict.sequlize, {
    foreignKey: 'parent_id',
    as: 'sys_dict_parent'
});
SysDict.sequlize.belongsTo(SysDict.sequlize, {
    foreignKey: 'parent_id',
    targetKey: 'id',
    as: 'sys_dict_child'
});

//一个酒店对应多篇文章
Houses.sequlize.hasMany(Articles.sequlize, {
    foreignKey: 'houses_id',
    targetKey: 'id'
});
//一篇文章对应一个酒店
Articles.sequlize.belongsTo(Houses.sequlize, {
    as: 'houses',
    foreignKey: 'houses_id',
    targetKey: 'id'
});

//一个vip关联一个精选者
UsersVip.sequlize.hasOne(Users.sequlize, {foreignKey: 'user_vip_id'});
//用户管理vip 外键存在于Users中
Users.sequlize.belongsTo(UsersVip.sequlize, {foreignKey: 'user_vip_id', targetKey: 'id'});


// 角色对应多个权限
SysRoles.sequlize.belongsToMany(SysResources.sequlize, {
    through: SysRoleResources.sequlize,
    foreignKey: "role_id",
    otherKey: 'resource_id'
});
//权限对应多个角色
SysResources.sequlize.belongsToMany(SysRoles.sequlize, {
    through: SysRoleResources.sequlize,
    foreignKey: "resource_id",
    otherKey: "role_id"
});
//用户对应多个角色
SysUsers.sequlize.belongsToMany(SysRoles.sequlize, {
    through: SysUserRoles.sequlize,
    foreignKey: "user_id",
    otherKey: "role_id"
});
//角色对应多个用户
SysRoles.sequlize.belongsToMany(SysUsers.sequlize, {
    through: SysUserRoles.sequlize,
    foreignKey: "role_id",
    otherKey: 'user_id'
});


export {
    Users, //会员
    UsersVip, //会员
    SysUsers, //后台管理员
    SysRoles, //角色
    SysResources,//权限
    SysRoleResources,//角色权限关联
    SysUserRoles, //关联角色与用户中间表
    SysDict, //字典
    UsersOpenid, // 微信用户 精选者
    UserOauthOpenid, // 第三方用户
    SysHotKeyword, // 系统热词
    Articles, // 文章
    Houses, // 酒店
    Activitys,
    ActivitysApply,
    ActivitysLocation,
}