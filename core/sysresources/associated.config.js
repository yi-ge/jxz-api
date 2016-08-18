import SysResources from './sysresources';
import SysRoles from './../sysroles/sysroles';
import SysRoleResources from './../sysroleresources/sysroleresources';
//权限对应多个角色
SysResources.sequlize.belongsToMany(SysRoles.sequlize, {
    through: SysRoleResources.sequlize,
    foreignKey: "resource_id",
    otherKey: "role_id"
});
export default SysResources;
