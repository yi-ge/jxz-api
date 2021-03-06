/**
 * Created by NX on 2016/8/8.
 */
import users from './users.config';
import Base from './../base';
import Articles from './../articles/articles';

const SEX={
    SECRECY:{
        STR:"保密",
        VALUE:2
    },
    MAN:{
        STR:"男",
        VALUE:0
    },
    FEMALE:{
        STR:"女",
        VALUE:1
    },
};


import UserOauthOpenid from './../useroauthopenid';
class Users extends Base {
    constructor() {
        super("users", users, {
            tableName: 'users'
        });
        this.SEX= SEX;
    }

    createModel(user_name, sex, avatar, lastloginip) {
        let model = {
            id: this.generateId(),
            created_at: new Date(),
            updated_at: new Date(),
            user_name: user_name,
            avatar: avatar,
            article_num: 0,
            is_cover: 0,
            sex: typeof sex == 'number' ? sex : this.getSexValue(sex),
            last_login_ip: this.ipToInt(lastloginip || "0.0.0.0"),
            last_login_date: new Date(),
            join_date: new Date(),
        };
        return model;
    }

    getSexValue(str) {
        if(typeof str == 'number ') str = this.getSexValue(str);
        let value = SEX.SECRECY.VALUE;
        switch (str) {
            case SEX.MAN.STR :value = SEX.MAN.VALUE;break;
            case SEX.FEMALE.STR :value = SEX.FEMALE.VALUE;break;
        }
        return value;
    }

    getStrSex(num) {
        let value = SEX.SECRECY.STR;
        switch (num) {
            case SEX.MAN.VALUE :value = SEX.MAN.STR;break;
            case SEX.FEMALE.VALUE :value = SEX.FEMALE.STR;break;
        }
        return value;
    }

    formatUser(user) {
        if (user == void(0)) return user;
        user.last_login_ip != void(0) && (user.last_login_ip = this.intToIp(user.last_login_ip));
        user.created_at != void(0) && (user.created_at = this.formatDate(user.created_at, "yyyy-MM-dd hh:mm:ss"));
        user.updated_at != void(0) && (user.updated_at = this.formatDate(user.updated_at, "yyyy-MM-dd hh:mm:ss"));
        user.last_login_date != void(0) && (user.last_login_date = this.formatDate(user.last_login_date, "yyyy-MM-dd hh:mm:ss"));
        user.join_date != void(0) && (user.join_date = this.formatDate(user.join_date, "yyyy-MM-dd hh:mm:ss"));
        user.sex != void(0) && (user.sex = this.getStrSex(user.sex));
        return user;
    }

    /**
     * 获取用户发表文章数
     * @param id
     * @returns {*}
     */
    getArticleCount(id) {
        return Articles.count({where: {author: id,is_draft:Articles.DRAFT.NO}});
    }

    /**
     * 修改发布文章数量
     * @param id
     * @param num
     * @param t
     * @returns {*}
     */
    updateArticleNum(id, num, t) {
        return this.update({
            article_num: num,
        }, {
            where: {id: id},
            transaction: t,
            lock: t.LOCK.UPDATE
        })
    }

    /**
     * 修改用户封面写手状态
     * @param id
     * @param is_cover
     * @param t
     * @returns {*}
     */
    updateCoverStatus(id, is_cover, t) {
        return this.update({
            is_cover: is_cover,
            updated_at: new Date()
        }, {
            where: {id: id},
            transaction: t,
            lock: t.LOCK.UPDATE
        })
    }

    /**
     * 关联vip用户
     * @param id
     * @param user_vip_id
     * @param t
     * @returns {*}
     */
    relationVip(id, user_vip_id, t) {
        return this.update({
            user_vip_id: user_vip_id
        }, {
            where: {id: id},
            transaction: t,
            lock: t.LOCK.UPDATE
        });
    }
}

export default new Users();