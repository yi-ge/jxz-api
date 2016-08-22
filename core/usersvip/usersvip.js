/**
 * Created by NX on 2016/8/8.
 */
import usersvip from './usersvip.config';
import Base from './../base';

class UsersVip extends Base {
    constructor() {
        super("users_vip", usersvip, {
            tableName: 'users_vip'
        });
    }

    getSexValue(str) {
        let value = 2;
        switch (str) {
            case "男" :
                value = 0;
                break;
            case "女" :
                value = 1;
                break;
        }
        return value;
    }

    getStrSex(num) {
        let value = "保密";
        switch (num) {
            case 0 :
                value = "男";
                break;
            case 1 :
                value = "女";
                break;
        }
        return value;
    }

    createModel(account_name, user_name, email, sex, password=666666, user_status = 0, is_cover = 0) {
        let model = {
            id: this.generateId(),
            account_name: account_name,
            user_name: user_name,
            email: email,
            sex: typeof sex == "number" ? sex : this.getSexValue(sex),
            passwd: this.encrypMD5(password),
            created_at: new Date(),
            updated_at: new Date(),
            last_login_date: new Date(),
            user_status: user_status,
            is_cover: 0,
        };
        return model;
    }

    formatUserVip(vip) {
        if(!vip) return vip;
        vip.last_login_date && (vip.last_login_date = this.formatDate(vip.last_login_date, "yyyy-MM-dd hh:mm:ss"));
        vip.created_at && (vip.created_at = this.formatDate(vip.created_at, "yyyy-MM-dd hh:mm:ss"));
        vip.updated_at && (vip.updated_at = this.formatDate(vip.updated_at, "yyyy-MM-dd hh:mm:ss"));
        delete vip.passwd;
        return vip;
    }

    /**
     * 查询用户是否存在
     * @param account_name
     */
    findAccountName(account_name){
        return this.findOnlyOne({where:{account_name:account_name}});
    }
}

export default new UsersVip();