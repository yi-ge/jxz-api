import express from "express";
import {UsersService,UsersAtService} from './../../../service/wetchat';
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
router.post('/atusers',(req,res,next)=>{
    let param = req.body;
    let id = param.id,
        at_user_id = param.at_user_id;
    UsersAtService.atUsers(id,at_user_id).then(result=>{
        next(result);
    }).catch(e=>{
        console.log(e);
        res.json({code: 1000, message: typeof e == 'string' ? e : "关注失败"});
    })
});
//是否关注
router.post('/isat',(req,res,next)=>{
    let param = req.body;
    let id = param.id,
        at_user_id = param.at_user_id;
    UsersAtService.isAtUser(id,at_user_id).then(result=>{
        next(result);
    }).catch(e=>{
        console.log(e);
        res.json({code: 1000, message: typeof e == 'string' ? e : "判断是否关注失败"});
    })
});

//获取用户信息
router.post('/getinfo',(req,res,next)=>{
    let param = req.body;
    let id = param.id;
    UsersService.getInfo(id).then(result=>{
        next(result);
    }).catch(e=>{
        console.log(e);
        res.json({code: 1000, message: typeof e == 'string' ? e : "获取用户信息失败"});
    });
});

export default router;