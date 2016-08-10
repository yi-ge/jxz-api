/**
 * Created by NX on 2016/8/8.
 */
import useroauthopenid from './useroauthopenid.config';
import Base from './../base';

class UsersOauthOpenid extends Base {
    constructor() {
        super("users_oauth_openid", useroauthopenid, {
            tableName: 'users_oauth_openid'
        });
    }
    createModel(userId,openid){
        let model = {
            id:this.generateId(),
            type: 1,
            user_id: userId,
            openid: openid,
            created_at: new Date(),
            updated_at: new Date(),
        };
        return model;
    }
}

export default new UsersOauthOpenid();