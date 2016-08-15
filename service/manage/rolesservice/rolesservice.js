import {SysRoles,SysResources,SysRoleResources,SysUserRoles,SysUsers} from './../../../core';
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
    updateRolesStatus(rolesId, status) {
        return SysRoles.transaction(t=> {
            return SysRoles.update({status: status}, {
                where: {id: rolesId},
                transaction: t,
                lock: t.LOCK.UPDATE
            }).then(roles=> {
                return roles;
            });
        });
    }

    /**
     * 权限 角色关联
     * @param rolesId
     * @param resourceId
     * @returns {*}
     */
    configRolesToResource(rolesId, resourceId) {
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
    configUserRoles(userId, rolesId) {
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
        return SysUsers.findAll({
            where: {id: userId},
            include: [SysRoles.sequlize]
        }).then(result=> {
            console.log(result);
            return result;
        });
    }

    /**
     * 查询角色 分页
     * @param page
     * @param pagesize
     * @returns {*}
     */
    findRoles(page, pagesize = 20) {
        return SysRoles.findAndCount().then(count=> {
            return count.count;
        }).then(count=> {
            return SysRoles.findPage({}, page, count, 1, pagesize);
        }).then(result=>{
            return result;
        });
    }

    findAllRoles(){
        return SysRoles.findAll({
            attributes:['id','name']
        }).then(result=>{
            return result;
        }).catch(e=>{
            console.log(e);
        });
    }

}
export default new RolesService();