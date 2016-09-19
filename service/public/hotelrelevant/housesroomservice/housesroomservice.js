import {HousesRoom,HousesRoomPrice,HousesSolarTerms} from './../../../../core';
class HousesRoomService {
    /**
     * 添加房间
     * @param house_id
     * @param houses_type
     * @param roomprices
     * @param creater
     * @returns {*}
     */
    addHousesRoom(house_id, houses_type, room_desc, roomprices, creater, modifier) {
        if (!house_id) return HousesRoom.errorPromise("参数不正确");
        return HousesRoom.count({where: {houses_id:house_id,houses_type: houses_type}}).then(count=> {
            if (count != 0) return HousesRoom.errorPromise("房型名称重复");
            return HousesRoom.transaction(t=> {
                let returnResult;
                return HousesRoom.insert(HousesRoom.createModel(house_id, houses_type, room_desc, creater, modifier || creater), {transaction: t}).then(room=> {
                    returnResult = room;
                    return HousesRoomPrice.bulkCreate(HousesRoomPrice.createListModel(house_id, room.id, roomprices, creater, modifier || creater));
                }).then(result=> {
                    console.log(result);
                    return returnResult;
                });
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
    editHousesRoom(id, house_id, houses_type, room_desc, roomprices, creater, modifier) {
        return HousesRoom.transaction(t=> {
            return this.destroy(id).then(result=> {
                return this.addHousesRoom(house_id, houses_type, room_desc, roomprices, creater, modifier);
            });
        }).then(result=> {
            return HousesRoom.findById(result.id, {
                order: `prices.season ASC`,
                attributes: ['id', 'houses_id', 'houses_type', 'room_desc'],
                include: [{
                    model: HousesRoomPrice.sequlize,
                    as: 'prices',
                    attributes: ['id', 'season', 'price', 'price_desc'],
                }]
            });
        }).then(roomlist=> {
            return roomlist;
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
            order: `prices.season ASC`,
            attributes: ['id', 'houses_id', 'houses_type', 'room_desc'],
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

    /**
     * 获取服务器时间 房型列表（包含当前时节的价格）
     * @param house_id
     * @returns {*}
     */
    findRoomCurrentPriceList(house_id) {
        let where = {houses_id: house_id}, currentDate = HousesRoom.formatDate(new Date(), 'yyyy-MM-dd');
        let currentTerm, termslist;
        return HousesSolarTerms.findList({where: where}).then(terms=> {
            termslist = terms.list;
            return currentTerm;
        }).then(result=> {
            return HousesRoom.findList({
                where: where,
                attributes: ['id', ['houses_type', 'name'], ['room_desc', 'desc']],
                include: [{
                    model: HousesRoomPrice.sequlize,
                    attributes: ['id', 'price', 'season'],
                    as: 'prices'
                }]
            });
        }).then(roomlist=> {
            roomlist.list.map(room=> {
                room.prices.map(price=> {
                    price.dataValues.terms = [];
                    termslist.map(term=> {
                        term = HousesSolarTerms.formatHousesSolarTerms(term);
                        if (term.start_date <= currentDate && term.end_date >= currentDate) currentTerm = term;
                        if (term.season == price.season) {
                            price.dataValues.terms.push({
                                start_date: term.start_date,
                                end_date: term.end_date,
                            });
                        }
                    });
                    if (currentTerm && currentTerm.is_set_price != HousesSolarTerms.ISSETPRICE.NO
                        && price.season == currentTerm.season) room.dataValues.current_prices = price.price;
                });
            });
            return roomlist;
        });
    }
}
export default new HousesRoomService();