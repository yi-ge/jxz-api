import express from "express";
import {RegionService} from './../../../service/manage';
const router = express.Router();
//添加大洲
router.post('/addstate',(req,res,next)=>{
    let param = req.body;
    let name = param.name,
        creater = param.creater;
    RegionService.addState(name,creater).then(result=>{
        next(result);
    }).catch(e=>{
        console.log(e);
        res.json({code:1000,message:"洲添加失败"});
    })
});
//添加城市
router.post('/addcountry',(req,res,next)=>{
    let param = req.body;
    let name = param.name,
        parent_id = param.parent_id,
        creater = param.creater;
    RegionService.addCountry(name,parent_id,creater).then(result=>{
        next(result);
    }).catch(e=>{
        console.log(e);
        res.json({code:1000,message:"洲添加失败"});
    })
});
//添加区域
router.post('/addregion',(req,res,next)=>{
    let param = req.body;
    let name = param.name,
        parent_id = param.parent_id,
        creater = param.creater;
    RegionService.addRegion(name,parent_id,creater).then(result=>{
        next(result);
    }).catch(e=>{
        console.log(e);
        res.json({code:1000,message:"洲添加失败"});
    })
});
export default router;