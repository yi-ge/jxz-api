import express from "express";
import {SysUsersService} from './../../../service/manage';
const router = express.Router();
//注册
router.post('/register', (req, res, next)=> {
    let param = req.body;
    console.log(param);
    SysUsersService.retister(param.accountname, param.password ,param.username,param.email,param.rolesId).then(result=> {
        next(result);
    }).catch(e=> {
        res.json({code: 1000, msg: "注册失败"});
    });
});
//登陆
router.post('/login', (req, res, next)=> {
    let param = req.body;
    SysUsersService.login(param.accountname, param.password).then(result=> {
        if (result.code == 1000) res.json(result);
        else next(result);
    }).catch(e=> {
        res.json({code: 1000, msg: "登陆失败"});
    });
});
//查询用户列表
router.post('/finduserlist',(req,res,next)=>{
    let page = req.body.page;
    SysUsersService.findSysUsers(page).then(result=>{
        next(result);
    }).catch(e=>{
        res.json({code:1000,message:"查询失败"});
    });
});
export default router;