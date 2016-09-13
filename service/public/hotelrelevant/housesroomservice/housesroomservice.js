import {HousesRoom,HousesRoomPrice} from './../../../../core';
class HousesRoomService {
    /**
     * 添加房间
     * @param house_id
     * @param houses_type
     * @param roomprices
     * @param creater
     * @returns {*}
     */
    addHousesRoom(house_id, houses_type, roomprices, creater, modifier) {
        return HousesRoom.transaction(t=> {
            let returnResult;
            return HousesRoom.insert(HousesRoom.createModel(house_id, houses_type, creater, modifier || creater), {transaction: t}).then(room=> {
                returnResult = room;
                return HousesRoomPrice.bulkCreate(HousesRoomPrice.createListModel(house_id, room.id, roomprices, creater, modifier || creater));
            }).then(result=> {
                console.log(result);
                return returnResult;
            });
        });
    }

    /**
     * 编辑房屋
     * @param id
     * @param house_id
     * @param houses_type
     * @param roomprices []
     * @param creater
     * @param modifier
     * @returns {*}
     */
    editHousesRoom(id, house_id, houses_type, roomprices, creater, modifier) {
        return HousesRoom.transaction(t=> {
            return this.destroy(id).then(result=> {
                return this.addHousesRoom(house_id, houses_type, roomprices, creater, modifier);
            });
        });
    }

    /**
     * 查询房屋列表
     * @param house_id
     * @returns {*}
     */
    findHousesRoomList(house_id) {
        let where = {houses_id: house_id};
        return HousesRoom.findList({
            where: where,
            attributes: ['id', 'houses_id', 'houses_type'],
            include: [{
                model: HousesRoomPrice.sequlize,
                as: 'prices',
                attributes: ['id', 'season', 'price', 'price_desc'],
            }]
        }).then(roomlist=> {
            return roomlist;
        });
    }

    /**
     * 删除房间
     * @param id
     * @returns {*}
     */
    destroy(id) {
        let whereRoom = {id: id}, whereRoomPrice = {houses_room_id: id};
        return HousesRoom.transaction(t=> {
            return HousesRoom.destroy({where: whereRoom}).then(result=> {
                return HousesRoomPrice.destroy({where: whereRoomPrice});
            }).then(result=> {
                return result;
            });
        });
    }

}
export default new HousesRoomService();