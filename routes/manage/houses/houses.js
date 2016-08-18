import express from "express";
import {HousesService} from './../../../service/manage';
const router = express.Router();
//添加系统酒店亮点
router.post('/addsyshousekeyword', (req, res, next)=> {
    let param = req.body;
    let name = param.name,
        picture = param.picture,
        creater = param.creater;
    HousesService.addSysHousesKeyword(name, picture, creater).then(result=> {
        next(result);
    }).catch(e=> {
        console.log(e);
        res.json({code: 1000, message: "系统酒店亮点添加失败"});
    });
});
//查询酒店亮点库
router.post('/findsyshousekeyword',(req,res,next)=>{
    let param = req.body;
    let page = param.page,
        startDate = param.startDate,
        endDate = param.endDate;
   HousesService.findSysHousesList(page,startDate,endDate).then(result=>{
       next(result);
   }).catch(e=> {
       console.log(e);
       res.json({code: 1000, message: "系统酒店亮点查询"});
   });
});
//更新酒店亮点库
router.post('/editsyshousekeyword',(req,res,next)=>{
    let param = req.body;
    let id = param.id,
        name = param.name,
        modifier = param.modifier,
        picture = param.picture;
    HousesService.editSysHousesKeyword(id, name, picture, modifier).then(result=>{
        next(result);
    }).catch(e=> {
        console.log(e);
        res.json({code: 1000, message: "系统酒店亮点更新"});
    });
});
//更新酒店亮点库状态
router.post('/changesyshousekeywordstatus',(req,res,next)=>{
    let param = req.body;
    let id = param.id,
        modifier = param.modifier,
        status = param.status;
    HousesService.changeSysHousesKeywordStatus(id, status,modifier).then(result=>{
        next(result);
    }).catch(e=> {
        console.log(e);
        res.json({code: 1000, message: "系统酒店亮点状态改变失败"});
    });
});

//给酒店添加亮点
router.post('/addhousekeyword',(req,res,next)=>{
    let param = req.body;
    let houses_id = param.houses_id,
        keyword_id = param.keyword_id,
        keyword_desc = param.keyword_desc,
        creater = param.creater;
    HousesService.addHousesKeyword(houses_id, keyword_id, keyword_desc, creater).then(result=>{
        next(result);
    }).catch(e=> {
        console.log(e);
        res.json({code: 1000, message: "系统酒店亮点查询"});
    });
});
//更新于酒店关联的亮点状态
router.post('/addhousekeyword',(req,res,next)=>{
    let param = req.body;
    let id = param.id,
        status = param.status,
        modifier = param.modifier;
    HousesService.changeHousesKeywordStatus(id,status,modifier).then(result=>{
        next(result);
    }).catch(e=> {
        console.log(e);
        res.json({code: 1000, message: "系统酒店亮点查询"});
    });
});
export default router;