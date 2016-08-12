import express from "express";
import {UserService} from './../../../service/wetchat';
const router = express.Router();

/**
 * 注册成为精选者
 */
router.post('/registerjxz', (req, res, next)=> {
    let openid = req.body, sex = param.sex == 1 ? "男" : param.sex == 2 ? "女" : "其他";
    UserService.registryJXZ(param.openid, param.nickname, sex, param.headimgurl).then(result=> {
        res.json(result);
    }).catch(e=> {
        res.json({code: 1, msg: e.message});
    });
});

/**
 * 获取精选者信息
 */
router.post('/getjxzinfo', (req, res, next)=> {
    let param = req.body, sex = param.sex == 1 ? "男" : param.sex == 2 ? "女" : "其他";
    UserService.findJXZToOpenid(param.openid, param.nickname, sex, param.headimgurl).then(result=> {
        res.json(result);
    }).catch(e=> {
        res.json({code: 1, msg: e.message});
    });
});


export default router;