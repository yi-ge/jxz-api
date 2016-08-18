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
import HousesKeyword from './houseskeyword';
import SysHousesKeyword from './syshouseskeyword';
import HousesAttach from './housesattach';

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
    HousesKeyword, // 酒店亮点
    SysHousesKeyword, //系统酒店亮点
    HousesAttach, //酒店附件
    Activitys,
    ActivitysApply,
    ActivitysLocation,
}