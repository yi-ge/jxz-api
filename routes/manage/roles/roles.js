import express from "express";
import {RolesService} from './../../../service/manage';
const router = express.Router();

//添加角色
router.post('/addrole', (req, res, next)=> {
    let param = req.body;
    RolesService.addRole(param.name, param.role_desc, param.resources, param.set_type).then(result=> {
        next(result);
    }).catch(e=> {
        console.log(e);
        res.json({code: 1000, message: "角色添加失败"});
    });
});
//角色状态修改
router.post("/updateroles", (req, res, next)=> {
    let id = req.body.id, status = req.body.status;
    RolesService.updateRolesStatus(id, status).then(result=> {
        next(result);
    }).catch(e=> {
        console.log(e);
        res.json({code: 1000, message: "状态修改失败"});
    })
});
//角色编辑
router.post('/editroles',(req,res,next)=>{
    let param = req.body;
    RolesService.editRoles(param.id,param.name,param.role_desc,param.resources,param.set_type).then(result=>{
        next(result);
    }).catch(e=>{
        console.log(e);
        res.json({code: 1000, message: "角色编辑失败"});
    });
});
//添加权限
router.post('/addresources', (req, res, next)=> {
    let param = req.body;
    RolesService.addResources(param.name, param.url, param.res_desc).then(result=> {
        next(result);
    }).catch(e=> {
        console.log(e);
        res.json({code: 1000, message: "权限添加失败"});
    });
});
//权限状态修改
router.post('/updateresource', (req, res, next)=> {
    let id = req.body.id, status = req.body.status;
    RolesService.updateResourceStatus(id, status).then(result=> {
        next(result);
    }).catch(e=> {
        res.json({code: 1000, message: "状态修改失败"});
    });
});
//权限编辑
router.post('/editresource', (req, res, next)=> {
    let param = req.body;
    RolesService.editResource(param.id, param.name, param.res_desc, param.url).then(result=> {
        next(result);
    }).catch(e=> {
        res.json({code: 1000, message: "编辑修改失败"});
    });
});
//角色权限配置
router.post("/configrolestoresources", (req, res, next)=> {
    let roles_id = req.body.roles_id, resource_id = req.body.resource_id;
    RolesService.addRolesToResource(roles_id, resource_id).then(result=> {
        next(result);
    }).catch(e=> {
        console.log(e);
        res.json({code: 1000, message: "配置失败"});
    });
});
//用户角色配置
router.post("/configuserstoroles", (req, res, next)=> {
    let user_id = req.body.user_id, roles_id = req.body.roles_id;
    RolesService.addUserRoles(user_id, roles_id).then(result=> {
        next(result);
    }).catch(e=> {
        console.log(e);
        res.json({code: 1000, message: "配置失败"});
    });
});
//查询角色列表(分页)
router.post('/findroles', (req, res, next)=> {
    let page = req.body.page;
    RolesService.findRoles(page).then(result=> {
        next(result);
    }).catch(e=> {
        res.json({code: 1000, message: "查询失败"});
    });
});
//查询角色列表(所有)
router.post('/findallroles', (req, res, next)=> {
    RolesService.findAllRoles().then(result=> {
        next(result);
    }).catch(e=> {
        res.json({code: 1000, message: "查询失败"});
    })
});
//查询权限列表（所有）
router.post('/findallresource', (req, res, next)=> {
    RolesService.findAllResource().then(result=> {
        next(result);
    }).catch(e=> {
        res.json({code: 1000, message: "查询失败"});
    })
});
export default router;