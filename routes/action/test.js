import express from "express";
let router = express.Router();

import {userService} from './../../service';

/* GET home page. */
router.get('/', function (req, res, next) {
    console.log(userService);
    res.json({code:0,msg:"成功"});
});

export default router;