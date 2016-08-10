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

export default router;