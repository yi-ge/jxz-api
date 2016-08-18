/**
 * Created by NX on 2016/8/8.
 */
import houses from './houses.config';
import Base from './../base';

class Houses extends Base {
    constructor() {
        super("houses", houses, {
            tableName: 'houses'
        });
    }

    /**
     *
     * @param type 类型 1为酒店
     * @param name 名称
     * @param creater 创建人id
     * @param modifier 修改人id
     * @param region 区域
     * @param address 地址
     * @param traffic_around 交通
     * @param spots_around 景色
     * @param houses_desc 介绍
     *        is_putaway 是否上架0未上架1上架
     *        comment_num 评论数
     *
     *
     * @returns {{id: number, type: *, name: *, region: *, creater: *, modifier: *, address: *, traffic_around: *, spots_around: *, houses_desc: *, created_at: Date, updated_at: Date, is_putaway: number, comment_num: number}}
     */
    createModel(type,name,creater,modifier,region,address,traffic_around,spots_around,houses_desc){
        let model = {
            id:this.generateId(),
            type:type,
            name:name,
            region:region,
            creater:creater,
            modifier:modifier,
            address:address,
            traffic_around:traffic_around,
            spots_around:spots_around,
            houses_desc:houses_desc,
            created_at:new Date(),
            updated_at:new Date(),
            is_putaway:0,
            comment_num:0,
        };
        return model;
    }

    formatHouse(house){
        return house;
    }
}

export default new Houses();