import express from "express";
import {SysUsersService,RolesService} from './../../../service/manage';
const router = express.Router();
//注册
router.post('/register', (req, res, next)=> {
    let param = req.body;
    next({
        $promise: SysUsersService.retister(param.account_name, param.password, param.user_name, param.email, param.roles_id),
        msg: '注册失败'
    });
});
//登陆
router.post('/login', (req, res, next)=> {
    let param = req.body;
    let account_name = param.account_name,
        password = param.password;
    next({
        $promise: SysUsersService.login(account_name, password),
        msg: '登陆失败'
    });
});
//修改密码
router.post('/updatepassword', (req, res, next)=> {
    let account_name = req.body.account_name, password = req.body.password,oldpassword = req.body.oldpassword;
    next({
        $promise: SysUsersService.updatePassword(account_name, password,oldpassword),
        msg: '密码修改失败'
    });
});
//更新管理员状态
router.post('/updateuser', (req, res, next)=> {
    let id = req.body.id, status = req.body.status;
    next({
        $promise: SysUsersService.updateSysUsersStatus(id, status),
        msg: '状态更新失败'
    });
});
//编辑管理员信息
router.post('/edituser', (req, res, next)=> {
    let id = req.body.id,
        user_name = req.body.user_name,
        phone = req.body.phone,
        email = req.body.email;
    next({
        $promise: SysUsersService.editSysUsers(id, user_name, email,phone),
        msg: '编辑失败'
    });
});
//修改管理员角色
router.post('/updateuserroles', (req, res, next)=> {
    let id = req.body.id,
        roles_id = req.body.roles_id;
    next({
        $promise: SysUsersService.updateUserRoles(id, roles_id),
        msg: '编辑失败'
    });
});
//查询用户列表
router.post('/finduserlist', (req, res, next)=> {
    let param = req.body;
    let page = param.page,
        pagesize = param.pagesize;
    next({
        $promise: SysUsersService.findSysUsers(page, pagesize),
        msg: '查询失败'
    });
});
//查询用户列表所有
router.post('/finduserall', (req, res, next)=> {
    next({
        $promise: SysUsersService.findSysUsersAll(),
        msg: '查询失败'
    });
});
//查询管理员详情
router.post('/details', (req, res, next)=> {
    let id = req.body.id;
    next({
        $promise: SysUsersService.findDetails(id),
        msg: '精选者查询失败'
    });
});
//查询管理员的精选者
router.post('/jxz', (req, res, next)=> {
    let id = req.body.id;
    next({
        $promise: SysUsersService.findSysUsersIsJXZ(id),
        msg: '精选者查询失败'
    });
});
//查询用户角色
router.post("/finduserroles", (req, res, next)=> {
    let id = req.body.id;
    next({
        $promise: SysUsersService.findUsersRoles(id),
        msg: '查询失败'
    });
});
//查询用户权限
router.post("/finduserresource", (req, res, next)=> {
    let id = req.body.id;
    next({
        $promise: SysUsersService.findUsersResource(id),
        msg: '查询失败'
    });
});
export default router;