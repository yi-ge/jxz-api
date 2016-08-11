import express from "express";
import {SysUsersService} from './../../../service/manage';
const router = express.Router();

router.get('/registry',(req,res,next)=>{
    res.json({code:0,msg:'成功'});
});

export default router;