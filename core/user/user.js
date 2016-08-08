/**
 * Created by NX on 2016/8/8.
 */
import {User} from './../sequelize.config.js';
import base from './../base';

class user extends base{
    constructor(){
        super("user",User);
    }
}

export default new user();