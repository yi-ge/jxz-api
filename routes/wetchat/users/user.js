import express from "express";
import {UsersService,UsersAtService} from './../../../service/wetchat';
const router = express.Router();

/**
 * 注册成为精选者
 */
router.post('/registerjxz', (req, res, next)=> {
    let param = req.body, sex = param.sex == 1 ? "男" : param.sex == 2 ? "女" : "其他";
    UsersService.registryJXZ(param.openid, param.nickname, sex, param.headimgurl).then(result=> {
        next(result);
    }).catch(e=> {
        console.log(e);
        res.json({code: 1000, msg: message});
    });
});

/**
 * 获取精选者信息
 */
router.post('/getjxzinfo', (req, res, next)=> {
    let param = req.body, sex = param.sex == 1 ? "男" : param.sex == 2 ? "女" : "其他";
    UsersService.findJXZToOpenid(param.openid, param.nickname, sex, param.headimgurl).then(result=> {
        next(result);
    }).catch(message=> {
        console.log(message);
        res.json({code: 1000, message: message});
    });
});

router.post('/atusers',(req,res,next)=>{
    UsersAtService.atUsers(user_id,at_user_id).then(result=>{
        next(result);
    }).catch(e=>{
        console.log(e);
        res.json({code: 1000, message: "关注失败"});
    })
});


export default router;