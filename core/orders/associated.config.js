/**
 * Created by NX on 2016/8/18.
 */
import Orders from './orders';
import UsersVip from './../usersvip/usersvip';
import Houses from './../houses/houses';
import HousesRoom from './../housesroom/housesroom';
//订单对应一个用户
Orders.sequlize.belongsTo(UsersVip.sequlize,{
    foreignKey:"order_user_id" ,
    targetKey:'id',
    as:'order_user'
});
//期望酒店
Orders.sequlize.belongsTo(Houses.sequlize,{
    foreignKey:'expect_houses_id',
    as:'expect_houses'
});
//期望房型
Orders.sequlize.belongsTo(HousesRoom.sequlize,{
    foreignKey:'expect_houses_room',
    targetKey:'id',
    as:'expect_room'
});
export default Orders;