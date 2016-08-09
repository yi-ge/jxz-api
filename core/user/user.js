/**
 * Created by NX on 2016/8/8.
 */
import user from './user.config';
import Base from './../base';

class User extends Base{
    constructor(){
        super("user",user);
    }
}

export default new User();