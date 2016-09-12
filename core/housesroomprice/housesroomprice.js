/**
 * Created by NX on 2016/8/8.
 */
import housesroomprice from './housesroomprice.config';
import Base from './../base';
const STATUS = {
    NORMAL:1,
    DELETE:0,
    DISABLE:2
},SEASON = {
    SLACK:1, //淡季
    BUSY:2, //旺季
    PEAK:3 //高峰
};

class HousesRoomPrice extends Base {
    constructor() {
        super("houses_room_price", housesroomprice, {
            tableName: 'houses_room_price'
        });
    }

    /**
     *
     * @param houses_id 房屋ID
     * @param houses_room_id 房屋房间ID
     * @param season 季节1淡季2旺季3高峰
     * @param price 价格
     * @param price_desc 价格描述
     * @param creater
     * @param modifier
     * @param status 状态1正常0删除2未启动
     * @returns {{id: number, houses_id: *, houses_room_id: *, season: *, price: *, price_desc: *, creater: *, modifier: *, status: (*|number), created_at: Date, updated_at: Date}}
     */
    createHousesRoomPrice(houses_id,houses_room_id,season,price,price_desc,creater,modifier,status){
        let model = {
            id:this.generateId(),
            houses_id:houses_id,
            houses_room_id:houses_room_id,
            season:season,
            price:price,
            price_desc:price_desc,
            creater:creater,
            modifier:modifier,
            status:status || STATUS.NORMAL,
            created_at:new Date(),
            updated_at:new Date(),
        };
        return model;
    }

    formatHousesRoomPrice(roomprice){
        return roomprice;
    }
}

export default new HousesRoomPrice();