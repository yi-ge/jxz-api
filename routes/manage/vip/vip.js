import express from "express";
import {VipService} from './../../../service/manage';
const router = express.Router();
//录入用户
router.post('/createvip', (req, res, next)=> {
    let param = req.body;
    let account_name = param.account_name,
        user_name = param.user_name,
        email = param.email,
        sex = param.sex,
        password = param.password;
    VipService.createVip(account_name, user_name, email, sex,password).then(result=> {
        next(result);
    }).catch(e=> {
        console.log(e);
        res.json({code: 1000, message: "用户录入失败"});
    });
});
//查询vip关联列表
router.post('/userviplist', (req, res, next)=> {
    let param = req.body;
    let page = param.page, sortType = req.body.sortType,
        startDate = req.body.startDate,
        endDate = req.body.endDate,
        is_cover = req.body.is_cover;
    VipService.findUserToVipList(page, sortType, startDate, endDate, is_cover).then(result=> {
        next(result);
    }).catch(e=> {
        console.log(e);
        res.json({code: 1000, message: "vip查询失败"})
    });
});

export default router;