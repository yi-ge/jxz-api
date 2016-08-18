/**
 * Created by NX on 2016/8/8.
 */
import houses from './houses.config';
import Base from './../base';
import SysUsers from './../sysusers/sysusers';

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
     *        is_orders 是否可预约0不能1能
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
            is_orders:0,
            comment_num:0,
        };
        return model;
    }

    formatHouse(house){
        !!house.created_at && (house.created_at = this.formatDate(house.created_at,'yyyy-MM-dd hh:mm:ss'));
        !!house.updated_at && (house.updated_at = this.formatDate(house.updated_at,'yyyy-MM-dd hh:mm:ss'));
        return house;
    }

    findPage(option, page, count, sortType = 2, pagesize = 20){
        return super.findPage(Object.assign({
            order: `updated_at ${sortType == 1 ? `ASC` : `DESC`}`,
            include: [{
                model: SysUsers.sequlize,
                as: 'creater_user',
                attributes: ['id', 'user_name', 'account_name']
            }, {
                model: SysUsers.sequlize,
                as: 'modifier_user',
                attributes: ['id', 'user_name', 'account_name']
            }]
        },option), page, count, sortType, pagesize);
    }

    findById(id,option){
        return super.findById(id,Object.assign({
            include: [{
                model: SysUsers.sequlize,
                as: 'creater_user',
                attributes: ['id', 'user_name', 'account_name']
            }, {
                model: SysUsers.sequlize,
                as: 'modifier_user',
                attributes: ['id', 'user_name', 'account_name']
            }]
        },option));
    }
}

export default new Houses();