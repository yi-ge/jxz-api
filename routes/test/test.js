import express from "express";
import {userService} from './../../service';
const router = express.Router();

router.get('/', function (req, res, next) {
    console.log(userService);
    res.json({code:0,msg:"成功"});
});

export default router;