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

    createModel(openid){
        let model={
            id:this.generateId(),
            openid:openid,
            type:1,
            created_at: new Date(),
            updated_at: new Date(),
        };
        return model;
    }

    formatUsersOpenid(jxz){
        jxz.created_at = this.formatDate(jxz.created_at,"yyyy-MM-hh");
        jxz.updated_at = this.formatDate(jxz.updated_at,"yyyy-MM-hh");
        return jxz;
    }
}

export default new UsersOpenid();