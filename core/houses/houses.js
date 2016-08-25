/**
 * Created by NX on 2016/8/8.
 */
import houses from './houses.config';
import Base from './../base';
import SysUsers from './../sysusers/sysusers';
import HousesComment from './../housescomment/housescomment';
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
     *        article_num 文章数
     *
     *
     * @returns {{id: number, type: *, name: *, region: *, creater: *, modifier: *, address: *, traffic_around: *, spots_around: *, houses_desc: *, created_at: Date, updated_at: Date, is_putaway: number, comment_num: number}}
     */
    createModel(type, name, creater, modifier, region, address, traffic_around, spots_around, houses_desc) {
        let model = {
            id: this.generateId(),
            type: type,
            name: name,
            region: region,
            creater: creater,
            modifier: modifier,
            address: address,
            traffic_around: traffic_around,
            spots_around: spots_around,
            houses_desc: houses_desc,
            created_at: new Date(),
            updated_at: new Date(),
            is_putaway: 0,
            is_orders: 0,
            comment_num: 0,
            article_num: 0,
        };
        return model;
    }

    formatHouse(house) {
        !!house.created_at && (house.created_at = this.formatDate(house.created_at, 'yyyy-MM-dd hh:mm:ss'));
        !!house.updated_at && (house.updated_at = this.formatDate(house.updated_at, 'yyyy-MM-dd hh:mm:ss'));
        return house;
    }

    getFindInclude(option) {
        let include = [{
            model: SysUsers.sequlize,
            as: 'creater_user',
            attributes: ['id', 'user_name', 'account_name']
        }, {
            model: SysUsers.sequlize,
            as: 'modifier_user',
            attributes: ['id', 'user_name', 'account_name']
        }];
        if (option && option.include) {
            if (Array.isArray(option.include)) option.include.concat(include);
            else option.include = [].concat(include, [option.include]);
        } else if (option) option.include = include;
        else option = {include: include};
        return option;
    }

    /**
     * 分页查询重写
     * @param option
     * @param page
     * @param count
     * @param sortType
     * @param pagesize
     * @returns {*|Promise.<T>}
     */
    findPage(option, page, count, sortType = 2, pagesize = 20) {
        this.getFindInclude(option);
        option.order = `updated_at ${sortType == 1 ? `ASC` : `DESC`}`;
        return super.findPage(option, page, count, sortType, pagesize);
    }

    /**
     * id查询重写
     * @param id
     * @param option
     * @returns {*}
     */
    findById(id, option) {
        return super.findById(id, this.getFindInclude(option));
    }

    /**
     * 获取酒店评论条数
     * @param id
     * @returns {*}
     */
    getCommentCount(id) {
        return HousesComment.count({where: {houses_id: id}});
    }

    /**
     * 修改酒店评论数
     * @param id
     * @param num
     * @param t
     * @returns {*}
     */
    updateArticleNum(id, num, t) {
        return this.update({
            article_num: num
        }, {
            where: {id: id},
            transaction: t,
            lock: t.LOCK.UPDATE,
        });
    }
}

export default new Houses();