import express from "express";
import {SysParameterService} from './../../../service/manage';
const router = express.Router();
//添加系统参数
router.post('/add',(req,res,next)=>{
    let param = req.body;
    let key = param.key,
        value = param.value,
        creater = param.creater;
    next({
        $promise: SysParameterService.addSysParameter(key,value,creater),
        msg:"参数添加失败"
    });
});
router.post('/edit',(req,res,next)=>{
    let param = req.body;
    let key = param.key,
        value = param.value,
        modifier = param.modifier;
    next({
        $promise: SysParameterService.editSysParameter(key,value,modifier),
        msg:"参数添加失败"
    });
});

router.post('/find',(req,res,next)=>{
    let param = req.body;
    let key = param.key;
    next({
        $promise: SysParameterService.findKey(key),
        msg:"参数添加失败"
    });
});
export default router;