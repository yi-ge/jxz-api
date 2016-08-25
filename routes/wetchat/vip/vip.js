import express from "express";
import {VipService} from './../../../service/wetchat';
const router = express.Router();
//会员注册
router.post('/register', (req, res, next)=> {
    let param = req.body;
    let account_name = param.account_name,
        users_id = param.users_id,
        password = param.password,
        openid = param.openid;
    next({
        $promise: VipService.registerVip(account_name, users_id, password),
        msg: '用户注册失败'
    });
});
//会员登陆
router.post('/login', (req, res, next)=> {
    let param = req.body;
    let account_name = param.account_name,
        users_id = param.users_id,
        password = param.password,
        openid = param.openid;
    next({
        $promise: VipService.loginVip(account_name, users_id, password),
        msg: '用户名或者密码错误'
    });
});

export default router;