/**
 * Created by NX on 2016/8/8.
 */
import orderslog from './orderslog.config';
import Base from './../base';
const EVENT_TYPE = {
    MAKE_APPOINTMENT:{
        VALUE:1,
        TEMPLATE:'已预约',
        CONTENT_FUNCTION:function(vip_id,house_name){
            return `会员${vip_id}已经预约${house_name}`
        }
    },
    WAIT_CONFIRMED:{
        VALUE:2,
        TEMPLATE:'待确认'
    },
    MAKE_CONFIRMED:{
        VALUE:3,
        TEMPLATE:'已确认'
    },
    MAKE_CONFIRMED_CHANGE:{
        VALUE:3,
        TEMPLATE:'已确认变更'
    },
    MAKE_FINISH:{
        VALUE:5,
        TEMPLATE:'已完成'
    },
    MAKE_CANCEL:{
        VALUE:6,
        TEMPLATE:'已取消'
    },
    MAKE_REFUND:{
        VALUE:7,
        TEMPLATE:'已退款'
    }
};
class OrdersLog extends Base {
    constructor() {
        super("orders_log", orderslog, {
            tableName: 'orders_log'
        });
        this.EVENT_TYPE = EVENT_TYPE;
    }

    /**
     *
     * @param order_id 预约订单ID
     * @param event_type 事件类型
     * @param event_name 事件名字
     * @param event_content 事件内容
     * @param event_user_id 记录人
     * @returns {{id: number, order_id: *, event_type: *, event_name: *, event_content: *, event_date: Date, event_user_id: *}}
     */
    createModel(order_id,event_type,event_name,event_content,event_user_id){
        let model = {
            id:this.generateId(),
            order_id:order_id,
            event_type:event_type,
            event_name:event_name,
            event_content:event_content,
            event_date:new Date(),
            event_user_id:event_user_id
        };
        return model;
    }
    formatOrdersLog(log){
        return log;
    }
}

export default new OrdersLog();