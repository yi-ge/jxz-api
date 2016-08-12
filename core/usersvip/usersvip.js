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
}

export default new UsersVip();