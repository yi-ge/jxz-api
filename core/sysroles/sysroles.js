/**
 * Created by NX on 2016/8/8.
 */
import sysroles from './sysroles.config';
import Base from './../base';

const STATUS = {
    DISABLE:2,
    ENABLE:1,
    DELETE:0
};

class SysRoles extends Base {
    constructor() {
        super("sys_roles", sysroles, {
            tableName: 'sys_roles'
        });
        this.STATUS = STATUS;
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