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

    formatUsersOpenid(jxz){
        jxz.created_at = this.formatDate(jxz.created_at,"yyyy-MM-dd hh:mm:ss");
        jxz.updated_at = this.formatDate(jxz.updated_at,"yyyy-MM-dd hh:mm:ss");
        return jxz;
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