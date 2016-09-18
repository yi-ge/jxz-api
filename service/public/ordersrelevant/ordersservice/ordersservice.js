import {Orders,OrdersLog,UsersVip,Houses,HousesRoom,Users,SysInform,AuditEditLog,UsersCoinLog} from './../../../../core';
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
                    Orders.ORDER_STATUS.MAKE_APPOINTMENT, vip.user_name, vip.email, house_id, vip.sex, vip_id, vip_id), {
                    transaction: t
                });
            }).then(order=> {
                let MAKE_APPOINTMENT = OrdersLog.EVENT_TYPE.MAKE_APPOINTMENT;
                return OrdersLog.insert(OrdersLog.createModel(order.id, MAKE_APPOINTMENT.VALUE, MAKE_APPOINTMENT.TEMPLATE,
                    MAKE_APPOINTMENT.CONTENT_FUNCTION(vip_id, userVip.user_name, currentHouse.name), vip_id), {
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
    editOrder(id, expect_houses_room, expect_checkin_time, expect_houses_combo, expect_need_room_num,
              expect_checkin_day, expect_coin, contacts, phone, email, order_remark, order_status, modifier) {
        let updateObj = {};
        return Orders.findById(id).then(order=> {
            if (!order) return Orders.errorPromise("订单不存在");
            expect_houses_room != void(0) && expect_houses_room != '' && (updateObj.expect_houses_room = expect_houses_room);
            expect_houses_combo != void(0) && expect_houses_combo != '' && (updateObj.expect_houses_combo = expect_houses_combo);
            expect_need_room_num != void(0) && expect_need_room_num != '' && (updateObj.expect_need_room_num = expect_need_room_num);
            expect_checkin_day != void(0) && expect_checkin_day != '' && (updateObj.expect_checkin_day = expect_checkin_day);
            expect_checkin_time != void(0) && expect_checkin_time != '' && (updateObj.expect_checkin_time = expect_checkin_time);
            expect_coin != void(0) && expect_coin != '' && (updateObj.expect_coin = expect_coin);
            contacts != void(0) && contacts != '' && (updateObj.contacts = contacts);
            phone != void(0) && phone != '' && (updateObj.contacts_phone = phone);
            email != void(0) && email != '' && (updateObj.contacts_email = email);
            order_remark != void(0) && order_remark != '' && (updateObj.order_remark = order_remark);
            modifier != void(0) && modifier != '' && (updateObj.modifier = modifier);
            order_status != void(0) && order_status != '' && (updateObj.order_status = Orders.ORDER_STATUS.WAIT_CONFIRMED);
            return Orders.transaction(t=> {
                return Orders.update(Object.assign(updateObj, {
                    updated_at: new Date(),
                }), {
                    where: {id: id},
                    transaction: t,
                    lock: t.LOCK.UPDATE
                });
            });
        }).then(result=> {
            return this.findOrderDetails(id);
        });
    }

    /**
     * 订单详情
     * @param id
     */
    findOrderDetails(id) {
        return Orders.findById(id, {
            attributes: ['id', 'contacts', 'contacts_phone', 'contacts_email', 'checkin_people_num',
                'expect_houses_id', 'order_status', 'expect_checkin_time', 'expect_coin', 'order_remark',
                'order_user_name', [UsersVip.col('order_user.account_name'), 'account_name'],
                [Houses.col('expect_houses.name'), 'expect_houses_name'],
                [Houses.col('expect_houses.address'), 'expect_houses_address'],
                [HousesRoom.col('expect_room.houses_type'), 'expect_room_type'],
                [HousesRoom.col('expect_room.id'), 'expect_room_id'],
                'expect_checkin_day', 'expect_need_room_num', 'created_at'],
            include: [{
                model: Houses.sequlize,
                as: 'expect_houses',
                attributes: []
            }, {
                model: UsersVip.sequlize,
                as: 'order_user',
                attributes: []
            }, {
                model: HousesRoom.sequlize,
                as: 'expect_room',
                attributes: []
            }]
        }).then(order=> {
            return Orders.formatOrders(order.dataValues);
        })
    }

    /**
     * 查询订单列表
     * @param where
     * @param page
     * @param pagesize
     */
    findOrderPageList(where, page, pagesize) {
        return Orders.count({
            where: where,
            include: [{
                model: Houses.sequlize,
                as: 'expect_houses',
                attributes: []
            }, {
                model: UsersVip.sequlize,
                as: 'order_user',
                attributes: []
            }]
        }).then(count=> {
            return Orders.findPage({
                where: where,
                attributes: ['id', 'created_at', 'order_user_name', [UsersVip.col('order_user.account_name'), 'account_name'], 'contacts',
                    'contacts_phone', 'contacts_email', 'order_status',
                    [Houses.col('expect_houses.name'), 'expect_houses_name'],
                    [Houses.col('expect_houses.address'), 'expect_houses_address'],
                ],
                include: [{
                    model: Houses.sequlize,
                    as: 'expect_houses',
                    attributes: []
                }, {
                    model: UsersVip.sequlize,
                    as: 'order_user',
                    attributes: []
                }],
                order: `created_at DESC`
            }, page, count, 2, pagesize);
        }).then(orders=> {
            orders.list.map(order=> {
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
    findOrdersPage(startDate, endDate, account_name, order_id, house_id, order_status, page, pagesize) {
        let where = {};
        if (endDate != void(0) && endDate != '') {
            endDate = new Date(endDate);
            endDate = endDate.setDate(endDate.getDate() + 1);
            endDate = Orders.formatDate(endDate, 'yyyy-MM-dd');
        }
        if (!!startDate && !!endDate) where['created_at'] = {$between: [startDate, endDate]};
        else if (!!startDate) where['created_at'] = {$gte: startDate};
        else if (!!endDate) where['created_at'] = {$lte: endDate};
        order_id != void(0) && order_id != '' && (where.id = order_id);
        account_name != void(0) && account_name != '' && (where.$and = UsersVip.where(UsersVip.col('order_user.account_name'), '=', account_name));
        house_id != void(0) && house_id != '' && (where.$and = Houses.where(Houses.col('expect_houses.id'), '=', house_id));
        order_status != void(0) && order_status != '' && (where = Object.assign(where, Orders.getOrderStatus(order_status)));
        return this.findOrderPageList(where, page, pagesize);
    }

    /**
     * 获取用户订单列表
     * @param vip_id
     * @param page
     * @param pagesize
     * @returns {*}
     */
    findVipOrders(vip_id, page, pagesize) {
        let where = {order_user_id: vip_id};
        return this.findOrderPageList(where, page, pagesize);
    }

    /**
     * 订单流程改变前调用
     * @param id
     * @returns {Promise}
     */
    procedureOrderBefore(id, order_status) {
        if (!id) return Orders.errorPromise("参数不正确");
        let orderResult, vipResult, houseResult, userResult;
        return Orders.findById(id).then(order=> {
            if (!order) return Orders.errorPromise("订单不存在");
            if (order.order_status === Orders.ORDER_STATUS.MAKE_REFUND) return Orders.errorPromise("订单已失效");
            return order;
        }).then(order=> {
            orderResult = order;
            return UsersVip.findById(order.order_user_id);
        }).then(vip=> {
            if (!vip) return UsersVip.errorPromise("预约用户不存在");
            return vip;
        }).then(vip=> {
            vipResult = vip;
            return Users.findOnlyOne({
                where: {user_vip_id: vip.id}
            });
        }).then(user=> {
            userResult = user;
            return Houses.findById(orderResult.expect_houses_id);
        }).then(house=> {
            houseResult = house;
            return UsersCoinLog.sumMoney(orderResult.id); //统计该条订单一共消费多少
        }).then((confirmCoin)=> {
            return {
                userResult: userResult,
                orderResult: orderResult,
                vipResult: vipResult,
                houseResult: houseResult,
                confirmCoin: confirmCoin || 0
            };
        });
    }

    /**
     * 确认订单
     * @param id
     * @returns {*}
     */
    confirmOrders(id, tomail, subject, text, modifier) {
        return this.procedureOrderBefore(id).then(({orderResult,vipResult,houseResult,userResult})=> {
            let changeCoin = orderResult.expect_coin;
            if (orderResult.order_status !== Orders.ORDER_STATUS.WAIT_CONFIRMED) return Orders.errorPromise("订单不是待确认状态");
            if (vipResult.coin < changeCoin) Orders.errorPromise("用户精选币不足");
            if (true) Orders.errorPromise("用户精选币不足");
            return Orders.transaction(t=> {
                return UsersVip.consumeCoin(vipResult.id, changeCoin, t).then(result=> { //扣除用户精选币
                    return UsersCoinLog.appointmentLog(vipResult.id, -changeCoin,
                        houseResult.name, orderResult.id, modifier, t); //创建用户币日志
                }).then(()=> {
                    return SysInform.userConfirmAppointment(userResult.id, houseResult.name, -changeCoin, t); //创建系统通知模板
                }).then(()=> {
                    return Orders.updateOrderStatus(orderResult.id, Orders.ORDER_STATUS.MAKE_CONFIRMED, modifier, t);//修改订单状态
                }).then(()=> {
                    let MAKE_CONFIRMED = OrdersLog.EVENT_TYPE.MAKE_CONFIRMED;
                    return OrdersLog.insert(OrdersLog.createModel(orderResult.id, MAKE_CONFIRMED.VALUE,
                        MAKE_CONFIRMED.TEMPLATE, null, modifier), {transaction: t});//创建订单日志
                }).then(()=> {
                    let MAKE_CONFIRMED = AuditEditLog.EVENT_MODULE.ORDER_MODULE.MAKE_CONFIRMED;
                    return AuditEditLog.insert(AuditEditLog.createModel(AuditEditLog.EVENT_TYPE.UPDATE,
                        MAKE_CONFIRMED.NAME, MAKE_CONFIRMED.GET_CONTENT(-changeCoin), modifier, orderResult.id), {transaction: t});//创建编辑-审核日志
                }).then(()=> { //发送邮件
                    return Email.sendMail(tomail, subject, text);
                });
            });
        });
    }

    /**
     * 订单确认修改
     * @param id
     * @param tomail
     * @param subject
     * @param text
     * @param modifier
     * @returns {*}
     */
    confirmedChangeOrder(id, tomail, subject, text, modifier) {
        return this.procedureOrderBefore(id).then(({orderResult,vipResult,houseResult,confirmCoin})=> {
            let changeCoin = orderResult.expect_coin - Math.abs(confirmCoin); //需要扣除的精选比
            if (orderResult.order_status !== Orders.ORDER_STATUS.WAIT_CONFIRMED) return Orders.errorPromise("订单不是待确认状态");
            if (vipResult.coin < Math.abs(changeCoin)) return Orders.errorPromise("用户精选币不足");
            return Orders.transaction(t=> {
                return UsersVip.consumeCoin(vipResult.id, changeCoin, t).then(()=> {//扣除消费精选币
                    return UsersCoinLog.changeAppointmentLog(vipResult.id, -changeCoin, houseResult.name, orderResult.id, modifier, t); //变更预约扣除
                }).then(()=> {
                    return Orders.updateOrderStatus(orderResult.id, Orders.ORDER_STATUS.MAKE_CONFIRMED_CHANGE, modifier, t);//修改订单状态
                }).then(()=> {
                    let MAKE_CONFIRMED_CHANGE = OrdersLog.EVENT_TYPE.MAKE_CONFIRMED_CHANGE;
                    return OrdersLog.insert(OrdersLog.createModel(orderResult.id, MAKE_CONFIRMED_CHANGE.VALUE,
                        MAKE_CONFIRMED_CHANGE.TEMPLATE, null, modifier), {transaction: t});//创建订单日志
                }).then(()=> {
                    let MAKE_CONFIRMED_CHANGE = AuditEditLog.EVENT_MODULE.ORDER_MODULE.MAKE_CONFIRMED_CHANGE;
                    return AuditEditLog.insert(AuditEditLog.createModel(AuditEditLog.EVENT_TYPE.UPDATE,
                        MAKE_CONFIRMED_CHANGE.NAME, MAKE_CONFIRMED_CHANGE.GET_CONTENT(-changeCoin),
                        modifier, orderResult.id), {transaction: t});//创建编辑-审核日志
                }).then(()=> {
                    return Email.sendMail(tomail, subject, text); //发送邮件
                });
            });
        });
    }

    /**
     * 取消订单
     * @param id
     * @param tomail
     * @param subject
     * @param text
     * @param modifier
     */
    cancelOrder(id, tomail, subject, text, modifier) {
        return this.procedureOrderBefore(id).then(({orderResult})=> {
            if (orderResult.order_status === Orders.ORDER_STATUS.MAKE_CANCEL) return Orders.errorPromise("不能再次取消");
            return Orders.transaction(t=> {
                return Orders.updateOrderStatus(orderResult.id, Orders.ORDER_STATUS.MAKE_CANCEL, modifier, t).then(()=> {//修改订单状态
                    let MAKE_CANCEL = OrdersLog.EVENT_TYPE.MAKE_CANCEL;
                    return OrdersLog.insert(OrdersLog.createModel(orderResult.id, MAKE_CANCEL.VALUE,
                        MAKE_CANCEL.TEMPLATE, null, modifier), {transaction: t});//创建订单日志
                }).then(()=> {
                    let MAKE_CANCEL = AuditEditLog.EVENT_MODULE.ORDER_MODULE.MAKE_CANCEL;
                    return AuditEditLog.insert(AuditEditLog.createModel(AuditEditLog.EVENT_TYPE.UPDATE, MAKE_CANCEL.NAME,
                        MAKE_CANCEL.GET_CONTENT(),
                        modifier, orderResult.id), {transaction: t});//创建编辑-审核日志
                }).then(()=> {
                    return Email.sendMail(tomail, subject, text); //发送邮件
                });
            });
        });
    }

    /**
     * 退款
     * @param id
     * @param tomail
     * @param subject
     * @param text
     * @param modifier
     */
    refundCoin(id, tomail, subject, text, refundcoin, modifier) {
        if (refundcoin < 0) return Orders.errorPromise("退款数不能小于0");
        return this.procedureOrderBefore(id).then(({orderResult,vipResult,confirmCoin})=> {
            let changeCoin = Math.abs(confirmCoin); //需要退还的精选比
            if (refundcoin > changeCoin) return Orders.errorPromise("退款精选币多余预约精选币");
            return Orders.transaction(t=> {
                return UsersVip.rechargeCoin(vipResult.id, refundcoin, t).then(()=> {//用户退费
                    return UsersCoinLog.cancelLog(vipResult.id, refundcoin, orderResult.id, modifier, t); //预约退款日志
                }).then(()=> {
                    return Orders.updateOrderStatus(orderResult.id, Orders.ORDER_STATUS.MAKE_REFUND, modifier, t);//修改订单状态
                }).then(()=> {
                    let MAKE_REFUND = OrdersLog.EVENT_TYPE.MAKE_REFUND;
                    return OrdersLog.insert(OrdersLog.createModel(orderResult.id, MAKE_REFUND.VALUE, MAKE_REFUND.TEMPLATE, null, modifier), {//创建订单日志
                        transaction: t
                    });
                }).then(()=> {
                    let MAKE_REFUND = AuditEditLog.EVENT_MODULE.ORDER_MODULE.MAKE_REFUND;
                    return AuditEditLog.insert(AuditEditLog.createModel(AuditEditLog.EVENT_TYPE.UPDATE, MAKE_REFUND.NAME,
                        MAKE_REFUND.GET_CONTENT(refundcoin),
                        modifier, orderResult.id), {transaction: t});//创建编辑-审核日志
                }).then(()=> {
                    return Email.sendMail(tomail, subject, text); //发送邮件
                });
            })
        });
    }
}
export default new OrdersService();