/**
 * Created by NX on 2016/8/8.
 */
import sysroles from './sysroles.config';
import Base from './../base';

class SysRoles extends Base {
    constructor() {
        super("sys_roles", sysroles, {
            tableName: 'sys_roles'
        });
    }

    createModel(name,role_desc,set_type){
        let model = {
            id:this.generateId(),
            name:name,
            role_desc:role_desc,
            set_type:set_type,
            created_at:new Date(),
            updated_at:new Date(),
        };
        return model;
    }

    formatSysRoles(sysroles){
        return sysroles;
    }
}

export default new SysRoles();