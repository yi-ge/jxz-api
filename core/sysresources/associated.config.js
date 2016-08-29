import SysResources from './sysresources';
import SysRoles from './../sysroles/sysroles';
import SysRoleResources from './../sysroleresources/sysroleresources';
//权限对应多个角色
SysResources.sequlize.belongsToMany(SysRoles.sequlize, {
    through: SysRoleResources.sequlize,
    foreignKey: "resource_id",
    otherKey: "role_id"
});

//一级对应多个二级
SysResources.sequlize.hasMany(SysResources.sequlize,{
    foreignKey:'parent_id',
    as:'second'
});
//二级对应一个一级
SysResources.sequlize.belongsTo(SysResources.sequlize,{
    foreignKey:'parent_id',
    targetKey:'id',
    as:'one'
});
//二级对应多个三级
SysResources.sequlize.hasMany(SysResources.sequlize,{
    foreignKey:'parent_id',
    targetKey:'id',
    as:'three'
});
//三级属于一个二级
SysResources.sequlize.belongsTo(SysResources.sequlize,{
    foreignKey:'parent_id',
    targetKey:'id',
    as:'second'
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
