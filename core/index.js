/**
 * Created by NX on 2016/8/8.
 */
import Users from './users';
import UsersVip from './UsersVip';
import SysUsers from './sysusers';
import Activitys from './activitys';
import ActivitysApply from './activitysapply';
import ActivitysLocation from './activityslocation';
import UsersOpenid from './usersopenid';
import UserOauthOpenid from './useroauthopenid';

// 设置关联关系
Users.sequlize.hasOne(UsersOpenid.sequlize,{foreignKey:"user_id"});//一个用户对应一个openid
UsersOpenid.sequlize.belongsTo(Users.sequlize,{foreignKey:"user_id",targetKey:"id"});//一个openid对应一个用户 外键存在于user_oauth_openid中 为user_id


export {
    Users, //会员
    UsersVip, //会员
    SysUsers, //后台管理员
    UsersOpenid, // 微信用户 精选者
    UserOauthOpenid, // 第三方用户
    Activitys,
    ActivitysApply,
    ActivitysLocation,
}