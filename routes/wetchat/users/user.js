import express from "express";
import {UserService} from './../../../service/wetchat';
const router = express.Router();

/**
 * 注册成为精选者
 */
router.post('/registerjxz', (req, res, next)=> {
    let openid = req.body.openid;
    console.log(req);
    UserService.registryJXZ(openid).then(result=> {
        res.json(result);
    }).catch(e=> {
        res.json({code: 1, msg: '精选者注册失败'});
    });
});

/**
 * 获取精选者信息
 */
router.post('/getjxzinfo', (req, res, next)=> {
    let openid = req.query.openid;
    UserService.findJXZToOpenid(openid).then(user=> {
        res.json(user);
    }).catch((e)=> {
        console.log(e);
        res.json({code: 1, msg: "获取竞选者信息失败"});
    });
});


export default router;