/**
 * Created by NX on 2016/8/8.
 */
import sequelize from './../../data/sequelize';
import {User} from './../sequelize.config.js';

let user = sequelize.define("user",User);

user.sync({force: false}).then(function () {
    // Table created
    return user.create({});
});
export default user;