import {SysRoles} from './../../../../core';
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
     * 修改角色状态
     * @param status
     */
    updateRolesStatus(id, status) {
        return SysRoles.transaction(t=> {
            return SysRoles.update({status: status,updated_at:new Date()}, {
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
    editRoles(id, name, role_desc, resources, set_type) {
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
     * 查询角色 分页
     * @param page
     * @param pagesize
     * @returns {*}
     */
    findRoles(page, pagesize) {
        return SysRoles.count().then(count=> {
            return count;
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
}
export default new RolesService();