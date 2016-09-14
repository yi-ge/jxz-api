/**
 * Created by NX on 2016/8/18.
 */
import HousesRoom from './housesroom';
import Houses from './../houses/houses';
import HousesRoomPrice from './../housesroomprice/housesroomprice';
import Orders from './../orders/orders';
//酒店房屋
HousesRoom.sequlize.belongsTo(Houses.sequlize,{
    foreignKey:'houses_id',
    targetKey:'id'
});
//房屋价格
HousesRoom.sequlize.hasMany(HousesRoomPrice.sequlize,{
    foreignKey:"houses_room_id",
    as:'prices'
});
HousesRoom.sequlize.hasMany(Orders.sequlize,{
    foreignKey:'expect_houses_room',
    as:'expect_room_order'
});
export default HousesRoom;