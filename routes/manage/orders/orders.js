import express from "express";
import {OrdersService} from './../../../service/manage';
const router = express.Router();
router.post('/findpagelist', (req, res, next)=> {
    let param = req.body;
    let page = param.page,
        startDate = param.startDate,
        order_id = param.order_id,
        account_name = param.account_name,
        order_status = param.order_status,
        endDate = param.endDate,
        house_id = param.houses_id,
        pagesize = param.pagesize;
    next({
        $promise: OrdersService.findOrdersPage(startDate,endDate,account_name,order_id,house_id,order_status,page,pagesize),
        msg: '查询失败'
    });
});
//订单编辑
router.post('/edit', (req, res, next)=> {
    let param = req.body;
    let id = param.id,
        expect_houses_room = param.expect_houses_room,
        expect_houses_combo = param.expect_houses_combo,
        expect_need_room_num = param.expect_need_room_num,
        expect_checkin_day = param.expect_checkin_day,
        contacts = param.contacts,
        phone = param.phone,
        email = param.email,
        order_remark = param.order_remark,
        expect_coin = param.expect_coin,
        modifier = param.modifier;
    next({
        $promise: OrdersService.editOrder(id,expect_houses_room,expect_houses_combo,expect_need_room_num,expect_checkin_day,expect_coin,contacts,phone,email,order_remark,modifier),
        msg: '编辑失败'
    });
});
//订单详情
router.post('/details', (req, res, next)=> {
    let param = req.body;
    let id = param.id;
    next({
        $promise: OrdersService.findOrderDetails(id),
        msg: '查看详情失败'
    });
});
export default router;