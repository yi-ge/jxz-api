/**
 * Created by NX on 2016/8/8.
 */
import sysusers from './sysusers.config';
import Base from './../base';

class SysUsers extends Base {
    constructor() {
        super("sys_users", sysusers, {
            tableName: 'sys_users'
        });
    }
}

export default new SysUsers();