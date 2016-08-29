import express from "express";
import {UsersService,UsersAtService,UsersFavoriteService} from './../../../service/wetchat';
const router = express.Router();

//注册成为精选者
router.post('/registerjxz', (req, res, next)=> {
    let param = req.body
    let sex = param.sex == 1 ? "男" : param.sex == 2 ? "女" : "其他",
        openid = param.openid,
        headimgurl = param.headimgurl,
        nickname = param.nickname;
    next({
        $promise: UsersService.registryJXZ(openid, nickname, sex, headimgurl),
        msg: '注册失败'
    });
});

//获取精选者信息
router.post('/getjxzinfo', (req, res, next)=> {
    let param = req.body, sex = param.sex == 1 ? "男" : param.sex == 2 ? "女" : "其他";
    next({
        $promise: UsersService.findJXZToOpenid(param.openid, param.nickname, sex, param.headimgurl),
        msg: '信息获取失败'
    });
});
//关注用户
router.post('/atusers', (req, res, next)=> {
    let param = req.body;
    let id = param.id,
        at_user_id = param.at_user_id;
    next({
        $promise: UsersService.atUsers(id, at_user_id),
        msg: '关注失败'
    });
});
//是否关注
router.post('/isat', (req, res, next)=> {
    let param = req.body;
    let id = param.id,
        at_user_id = param.at_user_id;
    next({
        $promise: UsersService.isAtUser(id, at_user_id),
        msg: '判断是否关注失败'
    });
});
//取消关注
router.post('/canceat', (req, res, next)=> {
    let param = req.body;
    let id = param.id,
        at_user_id = param.at_user_id;
    next({
        $promise: UsersService.cancelAt(id, at_user_id),
        msg: '取消关注失败'
    });
});
//统计关注数
router.post('/countatnum', (req, res, next)=> {
    let param = req.body;
    let id = param.id,
        atnum = {};
    let $promise = UsersService.countAtUser(id)
        .then(count=> {
            atnum.atuser = count;
            return UsersService.countUserAt(id);
        }).then(count=> {
            atnum.userat = count;
            return atnum;
        });
    next({
        $promise: $promise,
        msg: '查询失败'
    });
});
//获取用户信息
router.post('/getinfo', (req, res, next)=> {
    let param = req.body;
    let id = param.id;
    next({
        $promise: UsersService.getInfo(id),
        msg: '获取用户信息失败'
    });
});
//发私信
router.post('/sponsoredmsg', (req, res, next)=> {
    let param = req.body;
    let user_id = param.user_id,
        from_user_id = param.from_user_id,
        content = param.content;
    next({
        $promise: UsersService.sponsoredMsg(user_id, from_user_id, content),
        msg: '私信发送失败'
    });
});

export default router;