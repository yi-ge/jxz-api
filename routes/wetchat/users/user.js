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
    UsersService.registryJXZ(openid, nickname, sex, headimgurl).then(result=> {
        next(result);
    }).catch(e=> {
        console.log(e);
        res.json({code: 1000, msg: message});
    });
});

//获取精选者信息
router.post('/getjxzinfo', (req, res, next)=> {
    let param = req.body, sex = param.sex == 1 ? "男" : param.sex == 2 ? "女" : "其他";
    UsersService.findJXZToOpenid(param.openid, param.nickname, sex, param.headimgurl).then(result=> {
        next(result);
    }).catch(message=> {
        console.log(message);
        res.json({code: 1000, message: message});
    });
});
//关注用户
router.post('/atusers', (req, res, next)=> {
    let param = req.body;
    let id = param.id,
        at_user_id = param.at_user_id;
    UsersAtService.atUsers(id, at_user_id).then(result=> {
        next(result);
    }).catch(e=> {
        console.log(e);
        res.json({code: 1000, message: typeof e == 'string' ? e : "关注失败"});
    })
});
//是否关注
router.post('/isat', (req, res, next)=> {
    let param = req.body;
    let id = param.id,
        at_user_id = param.at_user_id;
    UsersAtService.isAtUser(id, at_user_id).then(result=> {
        next(result);
    }).catch(e=> {
        console.log(e);
        res.json({code: 1000, message: typeof e == 'string' ? e : "判断是否关注失败"});
    })
});
//取消关注
router.post('/canceat', (req, res, next)=> {
    let param = req.body;
    let id = param.id,
        at_user_id = param.at_user_id;
    UsersAtService.cancelAt(id, at_user_id).then(result=> {
        next(result);
    }).catch(e=> {
        console.log(e);
        res.json({code: 1000, message: typeof e == 'string' ? e : "取消关注失败"});
    });
});
//收藏文章
router.post('/collectionarticle', (req, res, next)=> {
    let param = req.body;
    let id = param.id,
        article_id = param.article_id;
    UsersFavoriteService.collectionArticle(id, article_id).then(result=> {
        next(result);
    }).catch(e=> {
        console.log(e);
        res.json({code: 1000, message: typeof e == 'string' ? e : "收藏文章失败"});
    });
});
//取消收藏
router.post('/cancelarticle', (req, res, next)=> {
    let param = req.body;
    let id = param.id,
        article_id = param.article_id;
    UsersFavoriteService.cancelArticle(id, article_id).then(result=> {
        next(result);
    }).catch(e=> {
        console.log(e);
        res.json({code: 1000, message: typeof e == 'string' ? e : "取消收藏失败"});
    });
});
//是否收藏
router.post('/iscollectionarticle', (req, res, next)=> {
    let param = req.body;
    let id = param.id,
        article_id = param.article_id;
    UsersFavoriteService.isCollectionArticle(id, article_id).then(result=> {
        next(result);
    }).catch(e=> {
        console.log(e);
        res.json({code: 1000, message: typeof e == 'string' ? e : "判断收藏是否失败"});
    });
});
//获取用户信息
router.post('/getinfo', (req, res, next)=> {
    let param = req.body;
    let id = param.id;
    UsersService.getInfo(id).then(result=> {
        next(result);
    }).catch(e=> {
        console.log(e);
        res.json({code: 1000, message: typeof e == 'string' ? e : "获取用户信息失败"});
    });
});
export default router;