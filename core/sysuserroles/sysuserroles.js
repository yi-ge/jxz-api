/**
 * Created by NX on 2016/8/8.
 */
import sysuserroles from './sysuserroles.config';
import Base from './../base';

class SysUserRoles extends Base {
    constructor() {
        super("sys_user_roles", sysuserroles, {
            tableName: 'sys_user_roles'
        });
    }

    createModel(userId,rolesId){
        let model = {
            id:this.generateId(),
            user_id:userId,
            role_id:rolesId,
        };
        return model;
    }

    formatSysUserRoles(userroles){
        return userroles;
    }
}

export default new SysUserRoles();