import express from "express";
import {OrdersService} from './../../../service/wetchat';
const router = express.Router();
//订单详情
router.post('/details', (req, res, next)=> {
    let param = req.body;
    let id = param.id;
    next({
        $promise: OrdersService.findOrderDetails(id),
        msg: '查询失败'
    });
});
//订单列表
router.post('/findlistpage', (req, res, next)=> {
    let param = req.body;
    let vip_id = param.vip_id,
        page = param.page,
        pagesize = param.pagesize;
    next({
        $promise: OrdersService.findVipOrders(vip_id,page,pagesize),
        msg: '查询失败'
    });
});
export default router;