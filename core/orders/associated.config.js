/**
 * Created by NX on 2016/8/18.
 */
import Orders from './orders';
import Users from './../users/users';
//订单对应一个用户
Orders.sequlize.belongsTo(Users.sequlize,{
    foreignKey:"order_user_id" ,
    targetKey:'id',
    as:'order_user'
});

export default Orders;