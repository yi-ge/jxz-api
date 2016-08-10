import express from "express";
import {UserService} from './../../service';
const router = express.Router();

router.get('/register',(req,res,next)=>{
    UserService.registry("xceusnsaiev54821sa").then(result=>{
        res.json(result);
    }).catch(e=>{
        console.log(e);
        res.json({code:1000,msg:'错误'});
    });
});

router.get('/userinfo',(req,res,next)=>{
    UserService.findByOpenid("xceusnsaiev54821sa").then(user=>{
        //if(user.length ==0 )res.json({code:1,msg:"用户不存在"});
        //else res.json(user[0]);
        res.json(user);
    });
});
export default router;