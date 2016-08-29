import express from "express";
import {VipService} from './../../../service/manage';
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
router.post('/list', (req, res, next)=> {
    let param = req.body;
    let page = param.page,
        sortType = param.sortType,
        pagesize = param.pagesize;
    next({
        $promise:VipService.findVipList(page,sortType,pagesize),
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
export default router;