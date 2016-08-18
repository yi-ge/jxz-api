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

export default router;