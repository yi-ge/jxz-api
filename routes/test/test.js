import express from "express";
import {userService} from './../../service';
const router = express.Router();

router.get('/', function (req, res, next) {
    userService.findOne().then((user)=>{
        console.log(user);
    });
    res.json({code:0,msg:"成功"});
});

export default router;