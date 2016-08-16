import express from "express";
import {UsersService} from './../../../service/manage';
const router = express.Router();

router.post('/userlist',(req,res,next)=>{
    let page = req.body.page, sortType=req.body.sortType;
    UsersService.findUserList(page,sortType).then(result=>{
        next(result);
    }).catch(e=>{
        console.log(e);
        res.json({code:1000,message:"用户查询失败"});
    });
});

export default router;