/**
 * Created by NX on 2016/8/8.
 */
import orders from './orders.config';
import Base from './../base';
const ORDER_STATUS = {
    MAKE_APPOINTMENT:1, //已预约
    WAIT_CONFIRMED:2, //待确认
    MAKE_CONFIRMED:3, //已确认
    MAKE_CONFIRMED_CHANGE:4, //已确认变更
    MAKE_FINISH:5, //已完成
    MAKE_CANCEL:6,  //已取消
    MAKE_REFUND:7 //已退款
};
class Orders extends Base {
    constructor() {
        super("orders", orders, {
            tableName: 'orders'
        });
        this.ORDER_STATUS = ORDER_STATUS;
    }

    /**
     *
     * @param order_user_id 预约用户id
     * @param order_user_phone 预约手机号
     * @param contacts 联系人
     * @param contacts_phone 联系人手机号
     * @param contacts_email 联系邮箱
     * @param order_user_name 预约姓名
     * @param order_user_sex 预约性别,0先生1女士
     * @param order_status 订单状态
     * @param cancel_opinion 取消原因
     * @param finish_date 完成时间
     * @param creater 创建人
     * @param modifier 修改人
     * @param city 城市,引用字典
     * @param region 区域,引用字典
     * @param status 状态1正常0删除2锁住
     * @param order_remark 订单备注
     * @param expect_order_date 预约时间
     * @param expect_houses_id 期望的房屋id
     * @param expect_houses_room 期望的房间id
     * @param expect_houses_combo 期望房间的套餐
     * @param expect_checkin_time 期望的入住时间
     * @param expect_need_room_num 期望的需要房间数量
     * @param expect_checkin_day 期望的入住几天
     * @param expect_coin 预计精币
     * @param expect_order_date2 预约时间
     * @param houses_id 房屋id
     * @param houses_room 房间id
     * @param houses_combo 房间的套餐
     * @param checkin_time 入住时间
     * @param need_room_num 需要房间数量
     * @param heckin_day 入住几天
     * @param coin 精币
     * @returns {{id: number}}
     */
    createModel(order_user_id, //预约用户id
                order_user_phone, //预约手机号
                contacts, //联系人
                contacts_phone, //联系人手机号
                order_status,//预约状态
                order_user_name,//预约姓名
                contacts_email, //联系邮箱
                expect_houses_id,//期望的酒店id
                creater,modifier,
                order_user_sex,
                cancel_opinion,city,region,status,order_remark,
                expect_houses_room,expect_houses_combo,expect_need_room_num,
                expect_checkin_day,expect_coin,houses_id,houses_room,houses_combo,
                need_room_num,heckin_day,coin){
        let model = {
            id:this.generateId(),
            order_user_id:order_user_id,
            order_user_phone:order_user_phone,
            contacts:contacts,
            contacts_email:contacts_email,
            contacts_phone:contacts_phone,
            order_status:order_status,
            creater:creater,
            modifier:modifier,
            finish_date:new Date(),
            expect_order_date:new Date(),
            expect_checkin_time:new Date(),
            expect_order_date2:new Date(),
            checkin_time:new Date(),
            created_at:new Date(),
            updated_at:new Date(),
        };
        return model;
    }

    formatOrders(order){
        return order;
    }

    /**
     * 获取订单状态的查询
     * @param status
     * @returns {{}}
     */
    getOrderStatus(status){
        let where = {};
        switch (status){
            case ORDER_STATUS.MAKE_APPOINTMENT:where.order_status = ORDER_STATUS.MAKE_APPOINTMENT;break;
            case ORDER_STATUS.WAIT_CONFIRMED:where.order_status = ORDER_STATUS.WAIT_CONFIRMED;break;
            case ORDER_STATUS.MAKE_CONFIRMED:where.order_status = ORDER_STATUS.MAKE_CONFIRMED;break;
            case ORDER_STATUS.MAKE_CONFIRMED_CHANGE:where.order_status = ORDER_STATUS.MAKE_CONFIRMED_CHANGE;break;
            case ORDER_STATUS.MAKE_FINISH:where.order_status = ORDER_STATUS.MAKE_FINISH;break;
            case ORDER_STATUS.MAKE_CANCEL:where.order_status = ORDER_STATUS.MAKE_CANCEL;break;
            case ORDER_STATUS.MAKE_REFUND:where.order_status = ORDER_STATUS.MAKE_REFUND;break;
        }
        return where;
    }

}

export default new Orders();