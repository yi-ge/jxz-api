import SysResources from './sysresources';
import SysRoles from './../sysroles/sysroles';
import SysRoleResources from './../sysroleresources/sysroleresources';
//权限对应多个角色
SysResources.sequlize.belongsToMany(SysRoles.sequlize, {
    through: SysRoleResources.sequlize,
    foreignKey: "resource_id",
    otherKey: "role_id"
});

//一级对应多个下一级
SysResources.sequlize.hasMany(SysResources.sequlize,{
    foreignKey:'parent_id',
    as:'resource_c'
});
//下一级对应多个上一级
SysResources.sequlize.belongsTo(SysResources.sequlize,{
    foreignKey:'parent_id',
    targetKey:'id',
    as:'resource_p',
});
//一个权限对应多个功能
SysResources.sequlize.hasMany(SysResources.sequlize,{
    foreignKey:'parent_id',
    as:'facility'
});
//功能对应权限
SysResources.sequlize.belongsTo(SysResources.sequlize,{
    foreignKey:'parent_id',
    targetKey:'id',
    as:'menu_resources'
});
export default SysResources;
