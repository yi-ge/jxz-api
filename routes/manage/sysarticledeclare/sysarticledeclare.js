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
        msg: '查询失败'
    });
});
export default router;