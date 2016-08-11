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
        res.json({code: 1, msg: 'openid不能为空'});
    });
});

/**
 * 获取精选者信息
 */
router.post('/getjxzinfo', (req, res, next)=> {
    let openid = req.body.openid;
    console.log(openid);
    UserService.findJXZToOpenid(openid).then(result=> {
        console.log(result);
        res.json(result);
    }).catch(e=> {
        res.json({code: 1, msg: "openid不能为空"});
    });
});


export default router;