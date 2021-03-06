import express from "express";
import {VipService,CoinLogService,OrdersService} from './../../../service/wetchat';
const router = express.Router();
//会员注册
router.post('/register', (req, res, next)=> {
    let param = req.body;
    let account_name = param.account_name,
        users_id = param.user_id,
        password = param.password;
    next({
        $promise: VipService.registerVip(account_name, users_id, password),
        msg: '用户注册失败'
    });
});
//获取会员信息 （默认登陆）
router.post('/defaultlogin', (req, res, next)=> {
    let param = req.body;
    let id = param.id,
        users_id = param.user_id;
    next({
        $promise: VipService.defaultLogin(id, users_id),
        msg: '会员信息获取失败'
    });
});
//会员登陆
router.post('/login', (req, res, next)=> {
    let param = req.body;
    let account_name = param.account_name,
        users_id = param.user_id,
        password = param.password;
    next({
        $promise: VipService.loginVip(account_name, users_id, password),
        msg: '用户名或者密码错误'
    });
});
//修改个人信息
router.post('/modifyinfo', (req, res, next)=> {
    let param = req.body;
    let account_name = param.account_name,
        user_name = param.user_name,
        email = param.email;
    next({
        $promise: VipService.modifyInfo(account_name,user_name,email),
        msg: '用户名或者密码错误'
    });
});
//重置密码
router.post('/resizepassword', (req, res, next)=> {
    let param = req.body;
    let account_name = param.account_name,
        password = param.password;
    next({
        $promise: VipService.resizePassword(account_name,password),
        msg: '用户名或者密码错误'
    });
});
//创建充值记录
router.post('/addrechargelog',(req,res,next)=>{
    let param = req.body;
    let id = param.id,
        sys_coin_id = param.sys_coin_id,
        coin = param.coin;
    next({
        $promise: CoinLogService.beforeRechargeLog(id,sys_coin_id,coin),
        msg: '充值失败'
    });
});
//会员充值
router.post('/wechatpay', (req, res, next)=> {
    let param = req.body;
    let id = param.id,
        order_id = param.order_id,
        status = param.status,
        coin = param.coin;
    next({
        $promise: VipService.rechargeCoin(id,order_id,coin,status),
        msg: '充值失败'
    });
});
//会员预约
router.post('/appointment', (req, res, next)=> {
    let param = req.body;
    let id = param.id,
        phone = param.phone,
        contacts = param.contacts,
        house_id = param.house_id;
    next({
        $promise: OrdersService.createOrder(id,phone,contacts,house_id),
        msg: '预约失败,请稍后再试'
    });
});
//会员币日志
router.post('/coinlog', (req, res, next)=> {
    let param = req.body;
    let id = param.id,
        page = param.page,
        pagesize = param.pagesize;
    next({
        $promise: CoinLogService.findCoinLog(id,page,pagesize),
        msg: '查询失败'
    });
});
export default router;