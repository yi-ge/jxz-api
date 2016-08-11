/**
 * Created by NX on 2016/8/8.
 */
import useroauthopenid from './useroauthopenid.config';
import Base from './../base';

import Users from './../users';

class UsersOauthOpenid extends Base {
    constructor() {
        super("users_oauth_openid", useroauthopenid, {
            tableName: 'users_oauth_openid'
        });
        //this.sequlize.belongsTo(Users.sequlize,{foreignKey:"user_id",targetKey:"id",constraints:false});
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

    formatUsersOauthOpenid(usersOauthOpenid){
        usersOauthOpenid.created_at = this.formatDate(usersOauthOpenid.created_at , "yyyy-MM-dd hh:mm:ss");
        usersOauthOpenid.updated_at = this.formatDate(usersOauthOpenid.updated_at , "yyyy-MM-dd hh:mm:ss");
        return usersOauthOpenid;
    }
}

export default new UsersOauthOpenid();