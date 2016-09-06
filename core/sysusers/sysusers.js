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
            passwd:this.encrypMD5(passwd),
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

    /**
     * 查询指定数据
     * @param id
     * @param option
     * @returns {*}
     */
    findById(id,option){
        return super.findById(id,Object.assign({
            attributer:{exclude:'passwd'}
        },option));
    }
    /**
     * 修改密码
     * @param id
     * @param password
     * @param t
     * @returns {*}
     */
    updatePasswd(account_name,password,t){
        return this.update({
            passwd:this.encrypMD5(password),
            updated_at:new Date(),
        },{
            where:{account_name:account_name},
            transaction:t,
            lock: t.LOCK.UPDATE,
        });
    }
}

export default  new SysUsers();