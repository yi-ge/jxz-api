import express from "express";
import {SysCoinService} from './../../../service/manage';
const router = express.Router();
//添加
router.post('/add', (req, res, next)=> {
    let param = req.body;
    let level = param.level,
        name = param.name,
        rule_money = param.rule_money,
        get_coin = param.get_coin,
        creater = param.creater;
    next({
        $promise:SysCoinService.addSysCoin(level,name,rule_money,get_coin,creater),
        msg: '精选币配置添加失败'
    });
});
//获取列表
router.post('/findlistall', (req, res, next)=> {
    let param = req.body;
    next({
        $promise:SysCoinService.findList(),
        msg: '获取列表失败'
    });
});
//改变状态
router.post('/changestatus', (req, res, next)=> {
    let param = req.body;
    let id = param.id,
        status = param.status,
        modifier = param.modifier;
    next({
        $promise:SysCoinService.changeSysCoinStatus(id,status,modifier),
        msg: '精选币配置状态修改失败'
    });
});
//编辑
router.post('/edit', (req, res, next)=> {
    let param = req.body;
    let id = param.id,
        level = param.level,
        name = param.name,
        rule_money = param.rule_money,
        get_coin = param.get_coin,
        modifier = param.modifier;
    next({
        $promise:SysCoinService.editSysCoin(id,level,name,rule_money,get_coin,modifier),
        msg: '角色添加失败'
    });
});
export default router;