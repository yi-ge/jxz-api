import express from "express";
import {SysHotKeywordService} from './../../../service/manage';
const router = express.Router();
//添加热词
router.post('/add',(req,res,next)=>{
    let param = req.body;
    let name = param.name,
        creater = param.creater;
    next({
        $promise: SysHotKeywordService.addHotKeyword(name,creater),
        msg:"热词添加失败"
    });
});
//查询热词
router.post('/findlist',(req,res,next)=>{
    let param = req.body;
    let page = param.page,
        pagesize = param.pagesize;
    next({
        $promise: SysHotKeywordService.findHotKeyword(page,pagesize),
        msg:"热词查询失败"
    });
});
//编辑热词
router.post('/edit',(req,res,next)=>{
    let param = req.body;
    let id = param.id,
        name = param.name,
        modifier = param.modifier;
    next({
        $promise: SysHotKeywordService.editHotKeyword(id,name,modifier),
        msg:"热词修改失败"
    });
});
//删除热词
router.post('/delete',(req,res,next)=>{
    let param = req.body;
    let id = param.id;
    next({
        $promise: SysHotKeywordService.destroy(id),
        msg:"热词删除失败"
    });
});



export default router;