/**
 * Created by NX on 2016/8/8.
 */
import users from './users.config';
import Base from './../base';
import Articles from './../articles/articles';
import UsersAt from './../usersat/usersat';

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
            sex:typeof sex == 'number'? sex : this.getSexValue(sex),
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
        if(user == void(0)) return user;
        user.last_login_ip!= void(0) && (user.last_login_ip = this.intToIp(user.last_login_ip));
        user.created_at!= void(0) && (user.created_at = this.formatDate(user.created_at, "yyyy-MM-dd hh:mm:ss"));
        user.updated_at!= void(0) && (user.updated_at = this.formatDate(user.updated_at, "yyyy-MM-dd hh:mm:ss"));
        user.last_login_date!= void(0) && (user.last_login_date = this.formatDate(user.last_login_date, "yyyy-MM-dd hh:mm:ss"));
        user.join_date!= void(0) && (user.join_date = this.formatDate(user.join_date, "yyyy-MM-dd hh:mm:ss"));
        user.sex != void(0) && (user.sex = this.getStrSex(user.sex));
        return user;
    }

    /**
     * 获取用户发表文章数
     * @param id
     * @returns {*}
     */
    getArticleCount(id){
        return Articles.count({where:{author:id}});
    }

    /**
     * 统计用户关注人的数目
     * @param id
     * @returns {*}
     */
    countUserAt(id){
        return UsersAt.count({where:{user_id:id,}});
    }
    /**
     * 统计被关注的数目
     * @param id
     * @returns {*}
     */
    countAtUser(id){
        return UsersAt.count({where:{at_user_id:id}});
    }
}

export default new Users();