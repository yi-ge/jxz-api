import express from "express";
import {RolesService} from './../../../service/manage';
const router = express.Router();

//添加角色
router.post('/addrole', (req, res, next)=> {
    let param = req.body;
    console.log(param);
    RolesService.addRole(param.name, param.role_desc, param.set_type).then(result=> {
        next(result);
        //res.json(result);
    }).catch(e=> {
        res.json({code: 1000, msg: "角色添加失败"});
    });
});
//添加权限
router.post('/addresources', (req, res, next)=> {
    let param = req.body;
    console.log(param);
    RolesService.addResources(param.name, param.url, param.res_desc).then(result=> {
        next(result);
    }).catch(e=> {
        console.log(e);
        res.json({code: 1000, msg: "权限添加失败"});
    })
});
//角色权限配置
router.post("/configrolestoresources", (req, res, next)=> {
    let rolesId = req.body.rolesId, resourceId = req.body.resourceId;
    RolesService.configRolesToResource(rolesId, resourceId).then(result=> {
        next(result);
    }).catch(e=> {
        console.log(e);
        res.json({code: 1000, msg: "配置失败"});
    });
});

//用户角色配置
router.post("/configuserstoroles", (req, res, next)=> {
    let userId = req.body.userId, rolesId = req.body.rolesId;
    RolesService.configUserRoles(userId, rolesId).then(result=> {
        next(result);
    }).catch(e=> {
        console.log(e);
        res.json({code: 1000, msg: "配置失败"});
    });
});

//角色状态修改
router.post("/updateroles", (req, res, next)=> {
    let rolesId = req.body.rolesId, status = req.body.status;
    RolesService.updateRolesStatus(rolesId,status).then(result=> {
        next(result);
    }).catch(e=> {
        console.log(e);
        res.json({code: 1000, msg: "状态修改失败"});
    })
});
//查询角色列表(分页)
router.post('/findroles', (req, res, next)=> {
    let page = req.body.page;
    console.log(page);
    RolesService.findRoles(page).then(result=> {
        next(result);
    }).catch(e=> {
        res.json({code: 1000, message: "查询失败"});
    });
});
//查询角色列表(所有)
router.post('/findallroles',(req,res,next)=>{
   RolesService.findAllRoles().then(result=>{
       next(result);
   }).catch(e=>{
       res.json({code:1000,message:"查询失败"});
   })
});
//查询用户角色
router.post("/finduserroles", (req, res, next)=> {
    let userId = req.body.userId;
    RolesService.findUsersRoles(userId).then(result=> {
        next(result);
    }).catch(e=> {
        res.json({code: 1000, msg: "查询失败"});
    });
});

export default router;