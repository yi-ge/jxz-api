import express from "express";
import {UsersService} from './../../../service/manage';
const router = express.Router();
//获取JXZ列表
router.post('/userlist', (req, res, next)=> {
    let page = req.body.page, sortType = req.body.sortType,
        user_name = req.body.user_name,
        pagesize = req.body.pagesize,
        is_cover = req.body.is_cover;
    next({
        $promise: UsersService.findJXZList(page, sortType, user_name, is_cover,pagesize),
        msg: '用户查询失败'
    });
});
//查询关联vip用户列表
router.post('/userviplist', (req, res, next)=> {
    let param = req.body;
    let page = param.page, sortType = req.body.sortType,
        pagesize = req.body.pagesize,
        startDate = req.body.startDate,
        endDate = req.body.endDate,
        user_status = req.body.user_status,
        vip_account_name = req.body.vip_account_name,
        is_cover = req.body.is_cover;
    next({
        $promise:UsersService.findUserToVipList(page, sortType, startDate, endDate,user_status, vip_account_name,is_cover,pagesize),
        msg: '用户查询失败'
    });
});
//切换封面写手
router.post('/updatecover', (req, res, next)=> {
    let id = req.body.id, is_cover = req.body.is_cover;
    next({
        $promise: UsersService.updateJXZCover(id, is_cover),
        msg: '状态切换失败'
    });
});
//切换封面写手
router.post('/getinfo', (req, res, next)=> {
    let id = req.body.id;
    next({
        $promise: UsersService.getInfo(id),
        msg: '获取精选者详情失败'
    });
});
//编辑精选者
router.post('/editinfo', (req, res, next)=> {
    let param = req.body;
    let id = param.id,
        user_name = param.user_name,
        sex = param.sex,
        personalized = param.personalized,
        avatar = param.avatar;
    next({
        $promise: UsersService.editInfo(id,user_name,sex,personalized,avatar),
        msg: '精选者编辑失败'
    });
});

export default router;