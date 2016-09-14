import UsersVip from './usersvip';
import Users from './../users/users';
import Orders from './../orders/orders';
//一个vip关联一个精选者
UsersVip.sequlize.hasOne(Users.sequlize, {foreignKey: 'user_vip_id'});
UsersVip.sequlize.hasMany(Orders.sequlize,{
    foreignKey:'order_user_id'
});
export default UsersVip;