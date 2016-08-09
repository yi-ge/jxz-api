import express from "express";
import {UsersService} from './../../service';
const router = express.Router();

router.get('/', function (req, res, next) {
    UsersService.insert({
        account_name:"237617561",
        phone:15928681754,
        user_name:"文浩君",
        nickname:"大保健",
        six:1,
        email:"237617561@qq.com",
        avatar:"http:www.baidu.com",
        account_money:10000,
        lock_money:10000,
        creater:95487411451,
        modifier:95487411451,
        created_at:new Date(),
        updated_at:new Date(),
        status:1,
        device_id:541321,
        last_login_ip:'192.168.10.110',
        last_login_date:new Date(),
        is_activate:1,
        set_type:2,
        personalized:'这东西太多了',
        join_date:new Date(),
        integral:54321,
        is_cover:1,
    }).then((user)=>{
        console.log(user.dataValues);
        res.json(user.dataValues);
    });
});

export default router;
