import express from "express";
import {SysParameterService} from './../../../service/manage';
const router = express.Router();
router.post('/add',(req,res,next)=>{
    let param = req.body;
    let param_key = param.param_key,
        param_value = param.param_value,
        creater = param.creater;
    next({
        $promise: SysParameterService.addSysParameter(param_key,param_value,creater),
        msg:"参数添加失败"
    });
});
export default router;