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

    ipToInt(ip) {
        let REG = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
        let result = REG.exec(ip);
        if (!result) return -1;
        return (parseInt(result[1]) << 24
            | parseInt(result[2]) << 16
            | parseInt(result[3]) << 8
            | parseInt(result[4])) >>> 0;
    }

    intToIp(INT) {
        if (INT < 0 || INT > 0xFFFFFFFF) {
            throw ("The number is not normal!");
        }
        return (INT >>> 24) + "." + (INT >> 16 & 0xFF) + "." + (INT >> 8 & 0xFF) + "." + (INT & 0xFF);
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
        return this.sequlize.create(user);
    }

}

export default new Users();