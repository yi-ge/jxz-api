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
        $promise: UsersAtService.atUsers(id, at_user_id),
        msg: '关注失败'
    });
});
//是否关注
router.post('/isat', (req, res, next)=> {
    let param = req.body;
    let id = param.id,
        at_user_id = param.at_user_id;
    next({
        $promise:UsersAtService.isAtUser(id, at_user_id),
        msg: '判断是否关注失败'
    });
});
//取消关注
router.post('/canceat', (req, res, next)=> {
    let param = req.body;
    let id = param.id,
        at_user_id = param.at_user_id;
    next({
        $promise:UsersAtService.cancelAt(id, at_user_id),
        msg: '取消关注失败'
    });
});
//收藏文章
router.post('/collectionarticle', (req, res, next)=> {
    let param = req.body;
    let id = param.id,
        article_id = param.article_id;
    next({
        $promise:UsersFavoriteService.collectionArticle(id, article_id),
        msg: '收藏文章失败'
    });
});
//取消收藏
router.post('/cancelarticle', (req, res, next)=> {
    let param = req.body;
    let id = param.id,
        article_id = param.article_id;
    next({
        $promise:UsersFavoriteService.cancelArticle(id, article_id),
        msg: '取消收藏失败'
    });
});
//是否收藏
router.post('/iscollectionarticle', (req, res, next)=> {
    let param = req.body;
    let id = param.id,
        article_id = param.article_id;
    next({
        $promise:UsersFavoriteService.isCollectionArticle(id, article_id),
        msg: '判断收藏是否失败'
    });
});
//获取用户信息
router.post('/getinfo', (req, res, next)=> {
    let param = req.body;
    let id = param.id;
    next({
        $promise:UsersService.getInfo(id),
        msg: '获取用户信息失败'
    });
});
export default router;