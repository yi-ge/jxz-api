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

    formatUser(user) {
        user.last_login_ip = this.intToIp(user.last_login_ip);
        user.created_at = this.formatDate(user.created_at , "yyyy-MM-dd hh:mm:ss");
        user.updated_at = this.formatDate(user.updated_at , "yyyy-MM-dd hh:mm:ss");
        user.last_login_date = this.formatDate(user.last_login_date , "yyyy-MM-dd hh:mm:ss");
        user.join_date = this.formatDate(user.join_date , "yyyy-MM-dd hh:mm:ss");
        return user;
    }

    insert(user){
        user.last_login_ip = this.ipToInt(user.last_login_ip);
        user.id = this.generateId();
        return super.insert(user);
    }

}

export default new Users();