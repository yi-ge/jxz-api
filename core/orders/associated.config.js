/**
 * Created by NX on 2016/8/18.
 */
import Orders from './orders';
import Users from './../users/users';
import Houses from './../houses/houses';
//订单对应一个用户
Orders.sequlize.belongsTo(Users.sequlize,{
    foreignKey:"order_user_id" ,
    targetKey:'id',
    as:'order_user'
});
//期望酒店
Orders.sequlize.belongsTo(Houses.sequlize,{
    foreignKey:'expect_houses_id',
    as:'expect_houses'
});
export default Orders;