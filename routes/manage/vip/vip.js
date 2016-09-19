import express from "express";
import {VipService,CoinLogService} from './../../../service/manage';
const router = express.Router();
//录入用户
router.post('/createvip', (req, res, next)=> {
    let param = req.body;
    let account_name = param.account_name,
        user_name = param.user_name,
        email = param.email,
        sex = param.sex,
        password = param.password;
    next({
        $promise:VipService.createVip(account_name, user_name, email, sex,password),
        msg: '用户录入失败'
    });
});
//获取vip列表
router.post('/notbindlist', (req, res, next)=> {
    let param = req.body;
    let page = param.page,
        startDate = req.body.startDate,
        pagesize = req.body.pagesize,
        endDate = req.body.endDate,
        user_status = req.body.user_status,
        account_name = req.body.account_name;
    next({
        $promise:VipService.findNotBindVip(page, startDate, endDate,user_status, account_name,pagesize),
        msg: '获取列表失败'
    });
});
router.post('/details',(req,res,next)=>{
    let param = req.body;
    let id = param.id;
    next({
        $promise:VipService.vipDetails(id),
        msg: '用户录入失败'
    });
});
//会员币日志
router.post('/coinlog', (req, res, next)=> {
    let param = req.body;
    let page = param.page,
        pagesize = param.pagesize,
        startDate = param.startDate,
        endDate = param.endDate,
        account_name = param.account_name;
    next({
        $promise: CoinLogService.findCoinLogPageListManage(startDate,endDate,account_name,page,pagesize),
        msg: '查询失败'
    });
});
export default router;