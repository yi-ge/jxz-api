import {SysRoles,SysResources,SysRoleResources,SysUserRoles,SysUsers} from './../../../core';
class RolesService {
    /**
     * 添加角色
     * @param name
     * @param role_desc
     * @param set_type
     * @returns {*}
     */
    addRole(name, role_desc, resources, set_type) {
        return SysRoles.transaction(t=> {
            return SysRoles.insert(SysRoles.createModel(name, role_desc, set_type), {transaction: t}).then(roles=> {
                return SysRoles.formatSysRoles(roles.dataValues);
            }).then(result=> {
                if (Array.isArray(resources) && resources.length > 0) {
                    return this.addRolesResources(result.id, resources).then(()=> {
                        return result;
                    });
                }
                return result;
            });
        });
    }

    /**
     * 添加权限
     * @param name
     * @param url
     * @param res_desc
     * @returns {*}
     */
    addResources(name, url, res_desc) {
        return SysResources.transaction(t=> {
            return SysResources.insert(SysResources.createModel(name, url, res_desc), {
                transaction: t
            }).then(resources=> {
                return SysResources.formatSysResources(resources.dataValues);
            });
        });
    }

    /**
     * 修改角色状态
     * @param status
     */
    updateRolesStatus(id, status) {
        return SysRoles.transaction(t=> {
            return SysRoles.update({status: status}, {
                where: {id: id},
                transaction: t,
                lock: t.LOCK.UPDATE
            });
        }).then(()=> {
            return SysRoles.findById(id);
        });
    }

    /**
     * 编辑角色
     * @param id
     * @param name
     * @param role_desc
     * @param set_type
     * @returns {Promise.<T>}
     */
    editRoles(id, name, role_desc, resources = [2222, 1111], set_type) {
        return SysRoles.transaction(t=> {
            return SysRoles.update({name: name, role_desc: role_desc, set_type: set_type, updated_at: new Date()}, {
                where: {id: id},
                transaction: t,
                lock: t.LOCK.UPDATE,
            }).then(result=> {
                if (Array.isArray(resources) && resources.length > 0)
                    return this.destroyRolesResources(id, resources).then(()=> {
                        return result;
                    });
                return result;
            });
        }).then(()=> {
            return SysRoles.findById(id);
        }).then(result=> {
            return SysRoles.formatSysRoles(result.dataValues);
        });
    }

    /**
     * 修改权限状态
     * @param id
     * @param status
     * @returns {*}
     */
    updateResourceStatus(id, status) {
        return SysResources.transaction(t=> {
            return SysResources.update({status: status}, {
                where: {id: id},
                transaction: t,
                lock: t.LOCK.UPDATE
            });
        }).then(()=> {
            return SysResources.findById(id);
        });
    }

    /**
     * 编辑权限
     * @param id
     * @param name
     * @param role_desc
     * @param set_type
     * @returns {Promise.<T>}
     */
    editResource(id, name, res_desc, url) {
        return SysResources.transaction(t=> {
            return SysResources.update({name: name, res_desc: res_desc, url: url, updated_at: new Date()}, {
                where: {id: id},
                transaction: t,
                lock: t.LOCK.UPDATE,
            });
        }).then(()=> {
            return SysResources.findById(id);
        }).then(result=> {
            return SysResources.formatSysResources(result.dataValues);
        });
    }

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

    /**
     * 用户角色关联
     * @param UserId
     * @param rolesId
     * @returns {*}
     */
    addUserRoles(userId, rolesId) {
        return SysUserRoles.transaction(t=> {
            return SysUserRoles.insert(SysUserRoles.createModel(userId, rolesId), {
                transaction: t
            }).then(userRoles=> {
                return userRoles;
            });
        });
    }

    /**
     * 查询用户角色
     * @param userId
     * @returns {*}
     */
    findUsersRoles(userId) {
        return SysUsers.findList({
            where: {id: userId},
            include: {
                model: SysRoles.sequlize
            }
        }).then(result=> {
            return result;
        });
    }

    /**
     * 通过用户查询权限
     * @param userId
     * @returns {*|Promise.<T>}
     */
    findUsersResource(userId) {
        return SysUsers.findList({
            where: {id: userId},
            include: [{
                model: SysRoles.sequlize,
                attributes: ['id', 'name'],
                through: {attributes: []},
                include: [{
                    model: SysRoleResources.sequlize,
                    through: {attributes: []},
                }]
            }]
        }).then(result=> {
            return result;
        });
    }

    /**
     * 查询角色 分页
     * @param page
     * @param pagesize
     * @returns {*}
     */
    findRoles(page, pagesize) {
        return SysRoles.findAndCount().then(count=> {
            return count.count;
        }).then(count=> {
            return SysRoles.findPage({}, page, count, 1, pagesize);
        }).then(result=> {
            return result;
        });
    }

    /**
     * 查询所有角色
     * @returns {Promise.<T>}
     */
    findAllRoles() {
        return SysRoles.findList({
            attributes: ['id', 'name']
        }).then(result=> {
            return result;
        });
    }

    /**
     * 查询所有权限
     * @returns {Promise.<T>}
     */
    findAllResource() {
        return SysResources.findList().then(result=> {
            return result;
        });
    }
}
export default new RolesService();