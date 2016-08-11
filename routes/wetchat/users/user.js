import express from "express";
import {UserService} from './../../../service/wetchat';
const router = express.Router();

router.get('/register',(req,res,next)=>{
    UserService.registry("xceusnsaiev54821sa").then(result=>{
        res.json(result);
    }).catch(e=>{
        res.json({code:1000,msg:'错误'});
    });
});

router.get('/userinfo',(req,res,next)=>{
    UserService.findByOpenid("xceusnsaiev54821sa").then(user=>{
        res.json(user);
    });
});
export default router;