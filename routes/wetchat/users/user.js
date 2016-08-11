import express from "express";
import {UserService} from './../../../service/wetchat';
const router = express.Router();

/**
 * 注册成为精选者
 */
router.post('/registerjxz', (req, res, next)=> {
    let openid = req.body.openid;
    console.log(req);
    if(!!openid) {
        UserService.registryJXZ(openid).then(result=> {
            res.json(result);
        }).catch(e=> {
            res.json({code: 1, msg: '精选者注册失败'});
        });
    }else {
        res.json({code:1,msg:'为获取到openid'});
    }
});

/**
 * 获取精选者信息
 */
router.get('/getjxzinfo', (req, res, next)=> {
    let openid = req.query.openid;
    UserService.findJXZToOpenid(openid).then(user=> {
        res.json(user);
    }).catch((e)=> {
        console.log(e);
        res.json({code: 1, msg: "获取竞选者信息失败"});
    });
});


export default router;