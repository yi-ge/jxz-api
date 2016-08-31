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
//获取会员信息 （默认登陆）
router.post('/defaultlogin', (req, res, next)=> {
    let param = req.body;
    let id = param.id,
        users_id = param.users_id;
    next({
        $promise: VipService.defaultLogin(id, users_id),
        msg: '会员信息获取失败'
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
export default router;