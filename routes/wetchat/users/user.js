import express from "express";
import {UsersService,UsersAtService,UsersFavoriteService,SysInformService,UsersMsgService} from './../../../service/wetchat';
const router = express.Router();

//注册成为精选者
router.post('/registerjxz', (req, res, next)=> {
    let param = req.body;
    let sex = param.sex == 1 ? "男" : param.sex == 2 ? "女" : "其他",
        openid = param.openid,
        headimgurl = param.headimgurl,
        nickname = param.nickname;
    next({
        $promise: UsersService.registryJXZ(openid, nickname, sex, headimgurl),
        message: '注册失败'
    });
});
//获取精选者信息
router.post('/getjxzinfo', (req, res, next)=> {
    let param = req.body, sex = param.sex == 1 ? "男" : param.sex == 2 ? "女" : "其他";
    next({
        $promise: UsersService.findJXZToOpenid(param.openid, param.nickname, sex, param.headimgurl),
        message: '信息获取失败'
    });
});
//关注用户
router.post('/atusers', (req, res, next)=> {
    let param = req.body;
    let id = param.id,
        at_user_id = param.at_user_id;
    next({
        $promise: UsersService.atUsers(id, at_user_id),
        message: '关注失败'
    });
});
//是否关注
router.post('/isat', (req, res, next)=> {
    let param = req.body;
    let id = param.id,
        at_user_id = param.at_user_id;
    next({
        $promise: UsersService.isAtUser(id, at_user_id),
        message: '判断是否关注失败'
    });
});
//取消关注
router.post('/canceat', (req, res, next)=> {
    let param = req.body;
    let id = param.id,
        at_user_id = param.at_user_id;
    next({
        $promise: UsersService.cancelAt(id, at_user_id),
        message: '取消关注失败'
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
        message: '查询失败'
    });
});
//获取用户信息
router.post('/getinfo', (req, res, next)=> {
    let param = req.body;
    let id = param.id;
    next({
        $promise: UsersService.getInfo(id),
        message: '获取用户信息失败'
    });
});
//编辑用户信息
router.post('/editinfo', (req, res, next)=> {
    let param = req.body;
    let id = param.id,
        user_name = param.user_name,
        personalized = param.personalized,
        sex = param.sex;
    next({
        $promise: UsersService.editInfo(id,user_name,sex,personalized),
        message: '编辑信息失败'
    });
});
//发私信
router.post('/sponsoredmsg', (req, res, next)=> {
    let param = req.body;
    let id = param.id,
        from_user_id = param.from_user_id,
        content = param.content;
    next({
        $promise: UsersMsgService.sponsoredMsg(id, from_user_id, content),
        message: '私信发送失败'
    });
});
//仿聊天查询私信
router.post('/imitatechat', (req, res, next)=> {
    let param = req.body;
    let id = param.id,
        from_user_id = param.from_user_id,
        page = param.page,
        pagesize = param.pagesize;
    next({
        $promise: UsersMsgService.imitateChat(id, from_user_id, page,pagesize),
        message: '私信发送失败'
    });
});
//没读私信
router.post('/isnewmsg', (req, res, next)=> {
    let param = req.body;
    let id = param.id;
    next({
        $promise: UsersMsgService.isNewMsg(id),
        message: '私信发送失败'
    });
});
//查询用户私信
router.post('/findmsglist', (req, res, next)=> {
    let param = req.body;
    let id = param.id,
        page = param.page,
        pagesize = param.pagesize;
    next({
        $promise: UsersMsgService.findUsersMsg(id, page,pagesize),
        message: '私信发送失败'
    });
});
//是否有没有读取的系统通知
router.post('/isnewnotice', (req, res, next)=> {
    let param = req.body;
    let id = param.id;
    next({
        $promise: SysInformService.isNewNotice(id),
        message: '存在没读取通知状态失败'
    });
});
//获取通知列表
router.post('/findnoticelist', (req, res, next)=> {
    let param = req.body;
    let id = param.id,
        page = param.page,
        pagesize = param.pagesize;
    next({
        $promise: SysInformService.findUsersSysNotice(id,page,pagesize),
        message: '系统通知查询失败'
    });
});
//有新的动态
router.post('/isnewdynamic', (req, res, next)=> {
    let param = req.body;
    let id = param.id;
    next({
        $promise: SysInformService.isNewDynamic(id),
        message: '存在没读取通知状态失败'
    });
});
//获取动态
router.post('/finddynamiclist', (req, res, next)=> {
    let param = req.body;
    let id = param.id,
        page = param.page,
        pagesize = param.pagesize;
    next({
        $promise: SysInformService.findUserDynamic(id,page,pagesize),
        message: '系统通知查询失败'
    });
});
//有新的评论
router.post('/isnewcomment', (req, res, next)=> {
    let param = req.body;
    let id = param.id;
    next({
        $promise: SysInformService.isNewComment(id),
        message: '存在没读取通知状态失败'
    });
});
//获取评论
router.post('/findcommentlist', (req, res, next)=> {
    let param = req.body;
    let id = param.id,
        page = param.page,
        pagesize = param.pagesize;
    next({
        $promise: SysInformService.findUseComment(id,page,pagesize),
        message: '系统通知查询失败'
    });
});
export default router;