import express from "express";
import {SysUsersService,RolesService} from './../../../service/manage';
const router = express.Router();
//注册
router.post('/register', (req, res, next)=> {
    let param = req.body;
    console.log(param);
    SysUsersService.retister(param.account_name, param.password, param.user_name, param.email, param.roles_id).then(result=> {
        next(result);
    }).catch(e=> {
        res.json({code: 1000, message: "注册失败"});
    });
});
//登陆
router.post('/login', (req, res, next)=> {
    let param = req.body;
    SysUsersService.login(param.account_name, param.password).then(result=> {
        if (result.code == 1000) res.json(result);
        else next(result);
    }).catch(e=> {
        res.json({code: 1000, message: "登陆失败"});
    });
});
//更新管理员状态
router.post('/updateuser', (req, res, next)=> {
    let id = req.body.id, status = req.body.status;
    SysUsersService.updateSysUsersStatus(id, status).then(result=> {
        next(result);
    }).catch(e=> {
        res.json({code: 1000, message: "状态更新失败"});
    });
});
//编辑管理员信息
router.post('/edituser', (req, res, next)=> {
    let id = req.body.id, user_name = req.body.user_name, email = req.body.email;
    SysUsersService.editSysUsers(id, user_name, email).then(result=> {
        next(result);
    }).catch(e=> {
        res.json({code: 1000, message: "编辑失败"});
    });
});
//查询用户列表
router.post('/finduserlist', (req, res, next)=> {
    let page = req.body.page;
    SysUsersService.findSysUsers(page).then(result=> {
        next(result);
    }).catch(e=> {
        res.json({code: 1000, message: "查询失败"});
    });
});
//查询用户角色
router.post("/finduserroles", (req, res, next)=> {
    let user_id = req.body.user_id;
    RolesService.findUsersRoles(user_id).then(result=> {
        next(result);
    }).catch(e=> {
        res.json({code: 1000, message: "查询失败"});
    });
});
//查询用户权限
router.post("/finduserresource", (req, res, next)=> {
    let user_id = req.body.user_id;
    RolesService.findUsersResource(user_id).then(result=> {
        next(result);
    }).catch(e=> {
        res.json({code: 1000, message: "查询失败"});
    });
});
export default router;