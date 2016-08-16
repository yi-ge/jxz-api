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

    createModel(account_name, user_name, email,sex, user_status = 0, is_cover = 0) {
        let model = {
            id: this.generateId(),
            account_name: account_name,
            user_name: user_name,
            email: email,
            sex: typeof sex == "number" ? sex : this.getSexValue(sex),
            created_at: new Date(),
            updated_at: new Date(),
            user_status: user_status,
            is_cover: 0,
        };
        return model;
    }

    formatUserVip(vip){
        return vip;
    }

}

export default new UsersVip();