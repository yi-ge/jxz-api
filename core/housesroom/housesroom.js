/**
 * Created by NX on 2016/8/8.
 */
import housesroom from './housesroom.config';
import Base from './../base';

const STATUS = {
    DELETE:0,
    NORMAL:1,
    DISABLE:2,
}
class HousesRoom extends Base {
    constructor() {
        super("houses_room", housesroom, {
            tableName: 'houses_room'
        });
    }

    /**
     *
     * @param houses_id 酒店ID
     * @param houses_type 房屋名称（普通）
     * @param creater 创建人
     * @param modifier 修改人
     * @param status 状态
     * @returns {{id: number, houses_id: *, houses_type: *, creater: *, modifier: *, status: (*|number), created_at: Date, updated_at: Date}}
     */
    createModel(houses_id,houses_type,room_desc,creater,modifier,status){
        let model = {
            id:this.generateId(),
            houses_id:houses_id,
            houses_type:houses_type,
            room_desc:room_desc,
            creater:creater,
            modifier:modifier,
            status:status || STATUS.NORMAL,
            created_at:new Date(),
            updated_at:new Date(),
        };
        return model;
    }

    formatHousesRoom(room){
        return room;
    }
}

export default new HousesRoom();