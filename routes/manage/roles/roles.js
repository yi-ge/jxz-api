import express from "express";
import {RolesService,ResourceService,UserRolesService,RoleResourcesService} from './../../../service/manage';
const router = express.Router();
//添加角色
router.post('/addrole', (req, res, next)=> {
    let param = req.body;
    next({
        $promise:RolesService.addRole(param.name, param.role_desc, param.resources, param.set_type),
        msg: '角色添加失败'
    });
});
//角色状态修改
router.post("/updateroles", (req, res, next)=> {
    let id = req.body.id, status = req.body.status;
    next({
        $promise:RolesService.updateRolesStatus(id, status),
        msg: '状态修改失败'
    });
});
//角色编辑
router.post('/editroles',(req,res,next)=>{
    let param = req.body;
    next({
        $promise:RolesService.editRoles(param.id,param.name,param.role_desc,param.resources,param.set_type),
        msg: '角色编辑失败'
    });
});
//添加菜单权限
router.post('/addresources', (req, res, next)=> {
    let param = req.body;
    let name = param.name,
        res_desc = param.res_desc,
        level = param.level,
        parent_id = param.parent_id,
        url = param.url,
        creater = param.creater;
    next({
        $promise:ResourceService.addResources(name, res_desc,level, parent_id, url, creater),
        msg: '权限添加失败'
    });
});
//添加功能权限
router.post('/addfacility', (req, res, next)=> {
    let param = req.body;
    let name = param.name,
        res_desc = param.res_desc,
        level = param.level,
        parent_id = param.parent_id,
        url = param.url,
        creater = param.creater;
    next({
        $promise:ResourceService.addFacilityResource(name, res_desc,level, parent_id, url, creater),
        msg: '权限添加失败'
    });
});
//权限状态修改
router.post('/updateresource', (req, res, next)=> {
    let id = req.body.id, status = req.body.status;
    next({
        $promise:ResourceService.updateResourceStatus(id, status),
        msg: '状态修改失败'
    });
});
//权限编辑
router.post('/editresource', (req, res, next)=> {
    let param = req.body;
    let id = param.id,
        name = param.name,
        url = param.url,
        res_desc = param.res_desc;
    next({
        $promise:ResourceService.editResource(id, name, res_desc, url),
        msg: '编辑修改失败'
    });
});
//删除编辑
router.post('/deleteresource', (req, res, next)=> {
    let param = req.body;
    let id = param.id;
    next({
        $promise:ResourceService.deleteResource(id),
        msg: '权限删除失败'
    });
});
//角色权限配置 (批量)
router.post('/configrolestoresourceslist',(req,res,next)=>{
    let roles_id = req.body.roles_id,
        resources = req.body.resources;
    next({
        $promise:RoleResourcesService.addRolesResources(roles_id, resources),
        msg: '配置失败'
    });
});
//角色权限配置
router.post("/configrolestoresources", (req, res, next)=> {
    let roles_id = req.body.roles_id, resource_id = req.body.resource_id;
    next({
        $promise:RoleResourcesService.addRolesToResource(roles_id, resource_id),
        msg: '配置失败'
    });
});
//用户角色配置
router.post("/configuserstoroles", (req, res, next)=> {
    let user_id = req.body.user_id, roles_id = req.body.roles_id;
    next({
        $promise:UserRolesService.addUserRoles(user_id, roles_id),
        msg: '配置失败'
    });
});
//查询角色列表(分页)
router.post('/findroles', (req, res, next)=> {
    let page = req.body.page;
    next({
        $promise:RolesService.findRoles(page),
        msg: '查询失败'
    });
});
//查询角色列表(所有)
router.post('/findallroles', (req, res, next)=> {
    next({
        $promise:RolesService.findAllRoles(),
        msg: '查询失败'
    });
});
//查询菜单权限列表（所有）
router.post('/findallresource', (req, res, next)=> {
    next({
        $promise:ResourceService.findAllResource(),
        msg: '查询失败'
    });
});
//查询菜单权限列表（所有）
router.post('/findallmenuresource', (req, res, next)=> {
    next({
        $promise:ResourceService.findAllMenuResource(),
        msg: '查询失败'
    });
});
//查询权限下功能权限列表（所有）
router.post('/findmenuchildfacility', (req, res, next)=> {
    let id = req.body.id;
    next({
        $promise:ResourceService.findMenuChildFacility(id),
        msg: '查询功能失败'
    });
});
export default router;