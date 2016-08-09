import express from "express";
import {UserService} from './../../service';
const router = express.Router();

router.get('/', function (req, res, next) {
    UserService.findOne().then((user)=>{
        console.log(user);
    });
    res.json({code:0,msg:"成功"});
});

export default router;