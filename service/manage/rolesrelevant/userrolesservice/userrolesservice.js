import {SysUserRoles} from './../../../../core';
class UserRolesService {
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
}
export default new UserRolesService();