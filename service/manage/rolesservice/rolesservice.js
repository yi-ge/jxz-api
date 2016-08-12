import {SysRoles,SysResources,SysRoleResources,SysUserRoles} from './../../../core';
class RolesService {
    /**
     * 添加角色
     * @param name
     * @param role_desc
     * @param set_type
     * @returns {*}
     */
    addRole(name, role_desc, set_type) {
        return SysRoles.transaction(t=> {
            return SysRoles.insert(SysRoles.createModel(name, role_desc, set_type), {transaction: t}).then(roles=> {
                return SysRoles.formatSysRoles(roles.dataValues);
            });
        });
    }

    addResources(name,url,res_desc){
        return SysResources.transaction(t=> {
            return SysResources.insert(SysResources.createModel(name,url,res_desc), {transaction: t}).then(resources=> {
                return SysResources.formatSysResources(resources.dataValues);
            });
        });
    }



}
export default new RolesService();