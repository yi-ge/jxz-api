import {Orders,OrdersLog,UsersVip,Houses,HousesRoom} from './../../../../core';
import Email from './../../../../data/nodemailer.config';

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
                    Orders.ORDER_STATUS.MAKE_APPOINTMENT, vip.user_name, vip.email, house_id,vip.sex, vip_id, vip_id), {
                    transaction: t
                });
            }).then(order=> {
                let MAKE_APPOINTMENT = OrdersLog.EVENT_TYPE.MAKE_APPOINTMENT;
                return OrdersLog.insert(OrdersLog.createModel(order.id, MAKE_APPOINTMENT.VALUE, MAKE_APPOINTMENT.TEMPLATE,
                    MAKE_APPOINTMENT.CONTENT_FUNCTION(vip_id,userVip.user_name, currentHouse.name), vip_id), {
                    transaction: t
                }).then((result)=> {
                    return order;
                });
            });
        });
    }

    /**
     * 编辑订单
     * @param id
     * @param expect_houses_room 期望的房间id
     * @param expect_houses_combo 期望房间的套餐
     * @param expect_need_room_num 期望的需要房间数量
     * @param expect_checkin_day expect_checkin_day
     * @param expect_checkin_time 期望的入住时间
     * @param expect_coin 预计精币
     * @param contacts 联系人
     * @param phone 联系人手机号
     * @param email 联系邮箱
     * @param order_remark 订单备注
     * @param modifier 修改人
     */
    editOrder(id,expect_houses_room,expect_checkin_time,expect_houses_combo,expect_need_room_num,
              expect_checkin_day,expect_coin,contacts,phone,email,order_remark,modifier){
        let updateObj = {};
        return Orders.findById(id).then(order=>{
            if(!order) return Orders.errorPromise("订单不存在");
            expect_houses_room != void(0) && expect_houses_room != '' &&(updateObj.expect_houses_room = expect_houses_room);
            expect_houses_combo != void(0) && expect_houses_combo != '' &&(updateObj.expect_houses_combo = expect_houses_combo);
            expect_need_room_num != void(0) && expect_need_room_num != '' &&(updateObj.expect_need_room_num = expect_need_room_num);
            expect_checkin_day != void(0) && expect_checkin_day != '' &&(updateObj.expect_checkin_day = expect_checkin_day);
            expect_checkin_time != void(0) && expect_checkin_time != '' &&(updateObj.expect_checkin_time = expect_checkin_time);
            expect_coin != void(0) && expect_coin != '' &&(updateObj.expect_coin = expect_coin);
            contacts != void(0) && contacts != '' &&(updateObj.contacts = contacts);
            phone != void(0) && phone != '' &&(updateObj.contacts_phone = phone);
            email != void(0) && email != '' &&(updateObj.contacts_email = email);
            order_remark != void(0) && order_remark != '' &&(updateObj.order_remark = order_remark);
            modifier != void(0) && modifier != '' &&(updateObj.modifier = modifier);

            return Orders.transaction(t=>{
                return Orders.update(Object.assign(updateObj,{
                    updated_at:new Date(),
                }),{
                    where:{id:id},
                    transaction:t,
                    lock: t.LOCK.UPDATE
                });
            });
        }).then(result=>{
            return this.findOrderDetails(id);
        });
    }

    /**
     * 订单详情
     * @param id
     */
    findOrderDetails(id){
        return Orders.findById(id,{
            attributes:['id','contacts','contacts_phone','contacts_email','checkin_people_num',
                'expect_houses_id','order_status','expect_checkin_time','expect_coin','order_remark',
                'order_user_name',[UsersVip.col('order_user.account_name'),'account_name'],
                [Houses.col('expect_houses.name'),'expect_houses_name'],
                [Houses.col('expect_houses.address'),'expect_houses_address'],
                [HousesRoom.col('expect_room.houses_type'),'expect_room_type'],
                [HousesRoom.col('expect_room.id'),'expect_room_id'],
                'expect_checkin_day','expect_need_room_num','created_at'],
            include:[{
                model:Houses.sequlize,
                as:'expect_houses',
                attributes:[]
            },{
                model:UsersVip.sequlize,
                as:'order_user',
                attributes:[]
            },{
                model:HousesRoom.sequlize,
                as:'expect_room',
                attributes:[]
            }]
        }).then(order=>{
            return Orders.formatOrders(order.dataValues);
        })
    }

    /**
     * 查询订单列表
     * @param where
     * @param page
     * @param pagesize
     */
    findOrderPageList(where,page,pagesize){
        return Orders.count({
            where:where,
            include:[{
                model:Houses.sequlize,
                as:'expect_houses',
                attributes:[]
            },{
                model:UsersVip.sequlize,
                as:'order_user',
                attributes:[]
            }]
        }).then(count=>{
            return Orders.findPage({
                where:where,
                attributes:['id','created_at','order_user_name',[UsersVip.col('order_user.account_name'),'account_name'],'contacts',
                    'contacts_phone','contacts_email','order_status',
                    [Houses.col('expect_houses.name'),'expect_houses_name'],
                    [Houses.col('expect_houses.address'),'expect_houses_address'],
                ],
                include:[{
                    model:Houses.sequlize,
                    as:'expect_houses',
                    attributes:[]
                },{
                    model:UsersVip.sequlize,
                    as:'order_user',
                    attributes:[]
                }],
                order:`created_at DESC`
            },page,count,2,pagesize);
        }).then(orders=>{
            orders.list.map(order=>{
                Orders.formatOrders(order.dataValues);
            });
            return orders;
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
    findOrdersPage(startDate,endDate,account_name,order_id,house_id,order_status,page,pagesize){
        let where = {};
        if(endDate != void(0) && endDate != ''){
            endDate = new Date(endDate);
            endDate = endDate.setDate(endDate.getDate()+1);
            endDate = Orders.formatDate(endDate,'yyyy-MM-dd');
        }
        if (!!startDate && !!endDate) where['created_at'] = {$between: [startDate, endDate]};
        else if (!!startDate) where['created_at'] = {$gte: startDate};
        else if (!!endDate) where['created_at'] = {$lte: endDate};
        order_id != void(0) && order_id != '' && (where.id = order_id);
        account_name != void(0) && account_name != '' && (where.$and = UsersVip.where(UsersVip.col('order_user.account_name'),'=',account_name));
        house_id != void(0) && house_id != '' && (where.$and = Houses.where(Houses.col('expect_houses.id'),'=',house_id));
        order_status != void(0) && order_status != '' && (where = Object.assign(where,Orders.getOrderStatus(order_status)));
        return this.findOrderPageList(where,page,pagesize);
    }

    /**
     * 获取用户订单列表
     * @param vip_id
     * @param page
     * @param pagesize
     * @returns {*}
     */
    findVipOrders(vip_id,page,pagesize){
        let where = {order_user_id:vip_id};
        return this.findOrderPageList(where,page,pagesize);
    }

}
export default new OrdersService();