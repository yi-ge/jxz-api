import SysRoles from './sysroles';
import SysUsers from './../sysusers/sysusers';
import SysUserRoles from './../sysuserroles/sysuserroles';
import SysResources from './../sysresources/sysresources';
import SysRoleResources from './../sysroleresources/sysroleresources';
// 角色对应多个权限
SysRoles.sequlize.belongsToMany(SysResources.sequlize, {
    through: SysRoleResources.sequlize,
    foreignKey: "role_id",
    otherKey: 'resource_id',
    as:'resources'
});

//角色对应多个用户
SysRoles.sequlize.belongsToMany(SysUsers.sequlize, {
    through: SysUserRoles.sequlize,
    foreignKey: "role_id",
    otherKey: 'user_id'
});
export default SysRoles;