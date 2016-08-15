/**
 * Created by NX on 2016/8/8.
 */
import crypto from 'crypto';
import sysusers from './sysusers.config';
import Base from './../base';

class SysUsers extends Base {
    constructor() {
        super("sys_users", sysusers, {
            tableName: 'sys_users'
        });
    }

    createModel(accountname,passwd,username,email){
        let model = {
            id:this.generateId(),
            account_name:accountname,
            user_name:username,
            email:email,
            created_at:new Date(),
            updated_at:new Date(),
            last_login_date:new Date(),
            passwd:this.encrypMD5("password")
        };
        return model;
    }

    formaySysUser(sysUser){
        sysUser.created_at = this.formatDate(sysUser.created_at , "yyyy-MM-dd hh:mm:ss");
        sysUser.updated_at = this.formatDate(sysUser.updated_at , "yyyy-MM-dd hh:mm:ss");
        sysUser.last_login_date = this.formatDate(sysUser.last_login_date , "yyyy-MM-dd hh:mm:ss");
        delete sysUser.passwd;
        return sysUser;
    }
}

export default new SysUsers();