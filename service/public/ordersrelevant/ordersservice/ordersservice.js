import {Orders,OrdersLog,UsersVip,Houses} from './../../../../core';

class OrdersService {
    /**
     * 用户预约 （微信）
     * @param vip_id
     * @param phone
     * @param contacts
     * @returns {*}
     */
    createOrder(vip_id, phone, contacts, house_id) {
        let userVip, currentHouse;
        return Orders.transaction(t=> {
            return Houses.findById(house_id).then(house => {
                if (!house)return Houses.errorPromise("酒店不存在");
                currentHouse = house;
                return UsersVip.findById(vip_id).then(vip=> {
                    if (!vip) return UsersVip.errorPromise("预约会员不存在");
                    userVip = vip;
                    return vip;
                });
            }).then(vip=> {
                return Orders.insert(Orders.createModel(vip_id, vip.phone, contacts, phone,
                    Orders.ORDER_STATUS.MAKE_APPOINTMENT, vip.user_name, vip.email, house_id, vip_id, vip_id), {
                    transaction: t
                });
            }).then(order=> {
                let MAKE_APPOINTMENT = OrdersLog.EVENT_TYPE.MAKE_APPOINTMENT;
                return OrdersLog.insert(OrdersLog.createModel(order.id, MAKE_APPOINTMENT.VALUE, MAKE_APPOINTMENT.TEMPLATE,
                    MAKE_APPOINTMENT.CONTENT_FUNCTION(vip_id, currentHouse.name), vip_id), {
                    transaction: t
                }).then((result)=> {
                    return order;
                });
            });
        });
    }

    /**
     * 查询订单 (后台)
     * @param startDate
     * @param endDate
     * @param vip_id
     * @param order_id
     * @param house_name
     * @param order_status
     * @param page
     * @param pagesize
     */
    findOrdersPage(startDate,endDate,vip_id,order_id,house_name,order_status,page,pagesize){
        let where = {};
        if(endDate != void(0)){
            endDate = new Date(endDate);
            endDate = end_date.setDate(endDate.getDate()+1);
            endDate = Orders.formatDate(endDate,'yyyy-MM-dd');
        }
        if (!!startDate && !!endDate) where['created_at'] = {$between: [startDate, endDate]};
        else if (!!startDate) where['created_at'] = {$gte: startDate};
        else if (!!endDate) where['created_at'] = {$lte: endDate};
        order_id != void(0) && (where.id = order_id);
        vip_id != void(0) && (where.order_user_id = vip_id);
        house_name != void(0) && (where.$and = Orders.where('expect_houses.name','=',house_name));
        order_status != void(0) && (where.order_status = Object.assign(where,Orders.getOrderStatus(order_status)));
        return Orders.count({
            where:where,
            include:[{
                model:Houses.sequlize,
                as:'expect_houses',
                attributes:['id','name']
            }]
        }).then(count=>{
            return Orders.findPage({
                where:where,
                attributes:['id','created_at','order_user_name','order_user_id','contacts',
                    'contacts_phone','contacts_email','order_status',['house_name',Houses.col('expect_houses.name')]],
                include:[{
                    model:Houses.sequlize,
                    as:'expect_houses',
                    attributes:[]
                }],
                order:`created_at DESC`
            },page,count,2,pagesize);
        });
    }

}
export default new OrdersService();