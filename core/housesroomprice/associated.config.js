/**
 * Created by NX on 2016/8/18.
 */
import HousesRoomPrice from './housesroomprice';
import Houses from './../houses/houses';
import HousesRoom from './../housesroom/housesroom';
//酒店价格
HousesRoomPrice.sequlize.belongsTo(Houses.sequlize,{
    foreignKey:'houses_id',
});
//房屋价格
HousesRoomPrice.sequlize.belongsTo(HousesRoom.sequlize,{
    foreignKey:'houses_room_id',
});
export default HousesRoomPrice;