import express from "express";
import {SysCoinService} from './../../../service/wetchat';
const router = express.Router();
//查询启用的充值档次
router.post('/findlist', (req, res, next)=> {
    let param = req.body;
    next({
        $promise: SysCoinService.findNormalList(),
        msg: '列表获取失败'
    });
});
export default router;