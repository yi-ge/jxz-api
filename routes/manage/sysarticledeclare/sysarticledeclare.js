import express from "express";
import {SysArticleDeclareService} from './../../../service/manage';
const router = express.Router();
//编辑服务条款
router.post('/edit', (req, res, next)=> {
    let param = req.body;
    let type = param.type,
        title = param.title,
        content = param.content,
        modifier = param.modifier;
    next({
        $promise: SysArticleDeclareService.editDeclare(type,title,content,modifier),
        msg: '编辑失败'
    });
});
//更具type查询对应条款
router.post('/edit', (req, res, next)=> {
    let param = req.body;
    let type = param.type;
    next({
        $promise: SysArticleDeclareService.findDeclareType(type),
        msg: '查询'
    });
});
//更具type删除对应条款
router.post('/edit', (req, res, next)=> {
    let param = req.body;
    let type = param.type;
    next({
        $promise: SysArticleDeclareService.destroy(type),
        msg: '删除失败'
    });
});


export default router;