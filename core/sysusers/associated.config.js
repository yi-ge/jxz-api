/**
 * Created by NX on 2016/8/18.
 */
import SysUsers from './sysusers';
import SysDict from './../sysdict/sysdict';
import Users from './../users/users';
import SysRoles from './../sysroles/sysroles';
import SysUserRoles from './../sysuserroles/sysuserroles';
import SysHousesKeyword from './../syshouseskeyword/syshouseskeyword';

//管理员创建多个管理员
SysUsers.sequlize.hasMany(SysUsers.sequlize,{
    foreignKey:'creater'
});
//管理员修改多个管理员
SysUsers.sequlize.hasMany(SysUsers.sequlize,{
    foreignKey:'modifier'
});
//用户创建多个字典
SysUsers.sequlize.hasMany(SysDict.sequlize, {
    foreignKey: 'creater',
});
//用户修改多个字典
SysUsers.sequlize.hasMany(SysDict.sequlize, {
    foreignKey: 'modifier',
});
//一个管理员创建多个关键词
SysUsers.sequlize.hasMany(SysHousesKeyword.sequlize,{
    foreignKey:'creater'
});
//一个管理员更新多个关键词
SysUsers.sequlize.hasMany(SysHousesKeyword.sequlize,{
    foreignKey:'modifier'
});
//用户对应一个精选者
SysUsers.sequlize.belongsTo(Users.sequlize, {
    foreignKey: 'users_id',
    targetKey: 'id',
});
//管理员存在创建人
SysUsers.sequlize.belongsTo(SysUsers.sequlize,{
    foreignKey:'creater',
    targetKey:'id',
    as:'creater_user'
});
//管理员存在修改人
SysUsers.sequlize.belongsTo(SysUsers.sequlize,{
    foreignKey:'modifier',
    targetKey:'id',
    as:'modifier_user'
});
//用户对应多个角色
SysUsers.sequlize.belongsToMany(SysRoles.sequlize, {
    through: SysUserRoles.sequlize,
    foreignKey: "user_id",
    otherKey: "role_id"
});
export default SysUsers;