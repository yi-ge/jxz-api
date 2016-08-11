import express from "express";
import {SysUsersService} from './../../../service/manage';
const router = express.Router();

router.post('/register', (req, res, next)=> {
    let param = req.body;
    console.log(param);
    SysUsersService.retister(param.accountname, param.password).then(result=> {
        res.json(result);
    }).catch(e=> {
        res.json({code: 1, msg: "注册失败"});
    });
});
router.post('/login', (req, res, next)=> {
    let param = req.body;
    SysUsersService.login(param.accountname, param.password).then(result=> {
        console.log(result);
        res.json(result);
    }).catch(e=> {
        res.json({code: 1, msg: "登陆失败"});
    });
});
export default router;