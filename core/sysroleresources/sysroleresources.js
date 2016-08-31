/**
 * Created by NX on 2016/8/8.
 */
import sysroleresources from './sysroleresources.config';
import Base from './../base';

class SysRoleResources extends Base {
    constructor() {
        super("sys_role_resources", sysroleresources, {
            tableName: 'sys_role_resources'
        });
    }

    createModel(rolesId, resourceId, permissions) {
        let model = {
            id: this.generateId(),
            role_id: rolesId,
            resource_id: resourceId,
            permissions: permissions
        };
        return model;
    }

    /**
     * 批量添加角色权限关联
     * @param role_id
     * @param resources
     */
    addRolesResources(role_id, resources, t) {
        let resourceList = [];
        resources.map((resource_id)=> {
            resourceList.push(this.createModel(role_id, resource_id));
        });
        return this.bulkCreate(resourceList, {transaction: t}).then(result=> {
            return result;
        });
    }


    /**
     * 批量取消角色权限关联
     * @param roles_id
     * @param resources
     */
    destroyRolesResources(role_id, resources, t) {
        return this.destroy({
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
    }

    /**
     * 权限 角色关联
     * @param rolesId
     * @param resourceId
     * @returns {*}
     */
    addRolesToResource(rolesId, resourceId, t) {
        return this.insert(this.createModel(rolesId, resourceId), {
            transaction: t
        }).then(rolesResource=> {
            return rolesResource;
        });
    }
}

export default new SysRoleResources();