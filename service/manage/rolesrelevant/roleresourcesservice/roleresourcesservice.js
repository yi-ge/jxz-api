import {SysRoleResources} from './../../../../core';
class RoleResourcesService {
    /**
     * 批量添加角色权限关联
     * @param role_id
     * @param resources
     */
    addRolesResources(role_id, resources) {
        return SysRoleResources.transaction(t=> {
            let resourceList = [];
            resources.map((resource_id)=> {
                resourceList.push(SysRoleResources.createModel(role_id, resource_id));
            });
            return SysRoleResources.bulkCreate(resourceList, {transaction: t}).then(result=> {
                return result;
            });
        });
    }

    /**
     * 批量取消角色权限关联
     * @param roles_id
     * @param resources
     */
    destroyRolesResources(role_id, resources) {
        return SysRoleResources.transaction(t=> {
            return SysRoleResources.destroy({
                where: {
                    role_id: role_id,
                    resource_id: {
                        $or: resources
                    }
                },
                transaction: t,
            }).then(result=> {
                return result;
            });
        });
    }

    /**
     * 权限 角色关联
     * @param rolesId
     * @param resourceId
     * @returns {*}
     */
    addRolesToResource(rolesId, resourceId) {
        return SysRoleResources.transaction(t=> {
            return SysRoleResources.insert(SysRoleResources.createModel(rolesId, resourceId), {
                transaction: t
            }).then(rolesResource=> {
                return rolesResource;
            });
        });
    }
}
export default new RoleResourcesService();