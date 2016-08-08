import express from "express";
import {userService} from './../../service';
const router = express.Router();

router.get('/', function (req, res, next) {
    userService.insert({
        id: new Date().getTime()  + parseInt(Math.random()*1000),
        firstName:"test",
        lastName:"test"
    }).then((user)=>{
        console.log(user);
    });
    res.json({code:0,msg:"成功"});
});

export default router;