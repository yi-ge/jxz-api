/**
 * Created by NX on 2016/8/8.
 */
import usersopenid from './usersopenid.config';
import Base from './../base';

class UsersOpenid extends Base {
    constructor() {
        super("users_openid", usersopenid, {
            tableName: 'users_openid'
        });
    }

    createModel(user_id,openid){
        let model={
            id:this.generateId(),
            user_id:user_id,
            openid:openid,
            type:1,
            created_at: new Date(),
            updated_at: new Date(),
        };
        return model;
    }

    formatUsersOpenid(useropen){
        useropen.created_at!=void(0)&& this.formatDate(useropen.created_at,"yyyy-MM-dd hh:mm:ss");
        useropen.updated_at !=void(0) &&  this.formatDate(useropen.updated_at,"yyyy-MM-dd hh:mm:ss");
        return useropen;
    }

    /**
     * 修改openid关联的精选者
     * @param id
     * @param user_id
     * @param t
     * @returns {*}
     */
    updateUsersId(id,user_id,t){
        return this.update({
            user_id:user_id
        },{
            where:{id:id},
            transaction:t,
            lock: t.LOCK.UPDATE
        })
    }
}

export default new UsersOpenid();