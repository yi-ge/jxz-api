import UsersVip from './usersvip';
import Users from './../users/users';
//一个vip关联一个精选者
UsersVip.sequlize.hasOne(Users.sequlize, {foreignKey: 'user_vip_id'});

export default UsersVip;