/**
 * Created by NX on 2016/8/8.
 */
import sequelize from './../../data/sequelize';
import {User} from './../sequelize.config.js';

let user = sequelize.define("user",User);

export default user;