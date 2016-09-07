/**
 * Created by NX on 2016/8/8.
 */
import userspaytype from './userspaytype.config';
import Base from './../base';

class UsersPayType extends Base {
    constructor() {
        super("users_pay_type", userspaytype, {
            tableName: 'users_pay_type'
        });
    }

}
export default new UsersPayType();