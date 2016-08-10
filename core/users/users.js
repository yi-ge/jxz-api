/**
 * Created by NX on 2016/8/8.
 */
import users from './users.config';
import Base from './../base';

class Users extends Base {
    constructor() {
        super("users", users, {
            tableName: 'users'
        });
    }

    createModel(lastloginip) {
        let model = {
            id:this.generateId(),
            created_at: new Date(),
            updated_at: new Date(),
            last_login_ip:this.ipToInt(lastloginip),
            last_login_date:new Date(),
            join_date:new Date(),
        };
        return model;
    }

    formatUser(user) {
        user.last_login_ip = this.intToIp(user.last_login_ip);
        user.created_at = this.formatDate(user.created_at, "yyyy-MM-dd hh:mm:ss");
        user.updated_at = this.formatDate(user.updated_at, "yyyy-MM-dd hh:mm:ss");
        user.last_login_date = this.formatDate(user.last_login_date, "yyyy-MM-dd hh:mm:ss");
        user.join_date = this.formatDate(user.join_date, "yyyy-MM-dd hh:mm:ss");
        return user;
    }

    insert(user, option) {
        user.last_login_ip = this.ipToInt(user.last_login_ip);
        return super.insert(user, option);
    }

}

export default new Users();