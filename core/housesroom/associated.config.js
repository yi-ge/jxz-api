/**
 * Created by NX on 2016/8/18.
 */
import HousesRoom from './housesroom';
import Houses from './../houses/houses';
import HousesRoomPrice from './../housesroomprice/housesroomprice';

//酒店房屋
HousesRoom.sequlize.belongsTo(Houses.sequlize,{
    foreignKey:'houses_id',
    targetKey:'id'
});
//房屋价格
HousesRoom.sequlize.hasOne(HousesRoomPrice.sequlize,{
    foreignKey:"houses_room_id"
});
export default HousesRoom;