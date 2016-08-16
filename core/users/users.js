/**
 * Created by NX on 2016/8/8.
 */
import users from './users.config';
import Base from './../base';

import UserOauthOpenid from './../useroauthopenid';
class Users extends Base {
    constructor() {
        super("users", users, {
            tableName: 'users'
        });
    }

    createModel(user_name,sex,avatar,lastloginip) {
        let model = {
            id:this.generateId(),
            created_at: new Date(),
            updated_at: new Date(),
            user_name:user_name,
            avatar:avatar,
            article_num:0,
            is_cover:0,
            sex:this.getSexValue(sex),
            last_login_ip:this.ipToInt(lastloginip || "0.0.0.0"),
            last_login_date:new Date(),
            join_date:new Date(),
        };
        return model;
    }

    getSexValue(str){
        let value = 2;
        switch (str){
            case "男" : value = 0;break;
            case "女" :value = 1;break;
        }
        return value;
    }

    getStrSex(num){
        let value = "保密";
        switch (num){
            case 0 : value = "男";break;
            case 1 :value = "女";break;
        }
        return value;
    }

    formatUser(user) {
        user.last_login_ip = this.intToIp(user.last_login_ip);
        user.created_at = this.formatDate(user.created_at, "yyyy-MM-dd hh:mm:ss");
        user.updated_at = this.formatDate(user.updated_at, "yyyy-MM-dd hh:mm:ss");
        user.last_login_date = this.formatDate(user.last_login_date, "yyyy-MM-dd hh:mm:ss");
        user.join_date = this.formatDate(user.join_date, "yyyy-MM-dd hh:mm:ss");
        user.sex = this.getStrSex(user.sex);
        return user;
    }

    insert(user, option) {
        return super.insert(user, option);
    }

}

export default new Users();