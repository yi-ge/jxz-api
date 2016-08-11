/**
 * Created by NX on 2016/8/8.
 */
import Users from './users';
import SysUsers from './sysusers';
import Activitys from './activitys';
import ActivitysApply from './activitysapply';
import ActivitysLocation from './activityslocation';
import UserOauthOpenid from './useroauthopenid';

// 设置关联关系
Users.sequlize.hasOne(UserOauthOpenid.sequlize,{foreignKey:"user_id"});//一个用户对应一个openid
UserOauthOpenid.sequlize.belongsTo(Users.sequlize,{foreignKey:"user_id",targetKey:"id"});//一个openid对应一个用户 外键存在于user_oauth_openid中 为user_id



export {
    Users,
    SysUsers,
    UserOauthOpenid,
    Activitys,
    ActivitysApply,
    ActivitysLocation,
}