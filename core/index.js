/**
 * Created by NX on 2016/8/8.
 */
import Users from './users';
import UsersVip from './usersvip';
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
import HousesComment from './housescomment';
import UsersAt from './usersat';
import ArticlesComment from './articlescomment';
import UsersFavorite from './usersfavorite';
import UsersMsg from './usersmsg';
import SysInform from './sysinform';
import SysInfoTemplate from './sysinfotemplate';
import SysParameter from './sysparameter';
import SysCoin from './syscoin';
import UsersCoinLog from './userscoinlog';
import UsersPayType from './userspaytype';
import SysArticleDeclare from './sysarticledeclare';
import Orders from './orders';
import HousesCombo from './housescombo';

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
    ArticlesComment, //文章评论
    UsersFavorite, //收藏文章
    Houses, // 酒店
    HousesKeyword, // 酒店亮点
    SysHousesKeyword, //系统酒店亮点
    HousesAttach, //酒店附件
    HousesComment, //酒店评论
    SysHotKeyword, //系统热词
    Activitys,
    ActivitysApply,
    ActivitysLocation,
    UsersAt, //用户关注
    UsersMsg, //用户消息
    SysInform,//消息 通知
    SysInfoTemplate,//消息 模板
    SysParameter,//系统参数
    SysCoin,//数据字典-精选币
    UsersCoinLog,//精选币-日志
    UsersPayType,//用户-支付类型
    SysArticleDeclare,//系统-条款声明
    Orders,//订单
    HousesCombo,//套餐
}