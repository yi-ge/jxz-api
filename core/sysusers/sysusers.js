/**
 * Created by NX on 2016/8/8.
 */
import sysusers from './sysusers.config';
import Base from './../base';
import Users from './../users/users';
class SysUsers extends Base {
    constructor() {
        super("sys_users", sysusers, {
            tableName: 'sys_users'
        });
    }

    createModel(accountname,passwd,username,email,users_id){
        let model = {
            id:this.generateId(),
            users_id:users_id,
            account_name:accountname,
            user_name:username,
            email:email,
            created_at:new Date(),
            updated_at:new Date(),
            last_login_date:new Date(),
            passwd:this.encrypMD5("password"),
        };
        return model;
    }

    /**
     * 获取管理员对应的精选者
     * @param id
     * @returns {*|Promise.<T>}
     */
    getJXZUser(id){
        return this.findById(id,{
            include:[{
                model:Users.sequlize
            }]
        }).then(result=>{
            return result.user;
        })
    }

    formaySysUser(sysUser){
        sysUser.created_at = this.formatDate(sysUser.created_at , "yyyy-MM-dd hh:mm:ss");
        sysUser.updated_at = this.formatDate(sysUser.updated_at , "yyyy-MM-dd hh:mm:ss");
        sysUser.last_login_date = this.formatDate(sysUser.last_login_date , "yyyy-MM-dd hh:mm:ss");
        delete sysUser.passwd;
        return sysUser;
    }
}

export default  new SysUsers();