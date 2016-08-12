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
}

export default new SysRoles();