import express from "express";
import {OrdersService} from './../../../service/manage';
const router = express.Router();
router.post('/findpagelist', (req, res, next)=> {
    let param = req.body;
    let page = param.page,
        startDate = param.startDate,
        order_id = param.order_id,
        vip_id = param.vip_id,
        order_status = param.order_status,
        endDate = param.endDate,
        house_name = param.house_name,
        pagesize = param.pagesize;
    next({
        $promise: OrdersService.findOrdersPage(startDate,endDate,vip_id,order_id,house_name,order_status,page,pagesize),
        msg: '查询失败'
    });
});
export default router;