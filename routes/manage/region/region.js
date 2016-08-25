import express from "express";
import {RegionService} from './../../../service/manage';
const router = express.Router();
//添加大洲
router.post('/addstate', (req, res, next)=> {
    let param = req.body;
    let name = param.name,
        creater = param.creater;
    next({
        $promise: RegionService.addState(name, creater),
        msg: '洲添加失败'
    });
});
//添加国家
router.post('/addcountry', (req, res, next)=> {
    let param = req.body;
    let name = param.name,
        state_id = param.state_id,
        creater = param.creater;
    next({
        $promise: RegionService.addCountry(name, state_id, creater),
        msg: '国家添加失败'
    });
});
//添加区域
router.post('/addregion', (req, res, next)=> {
    let param = req.body;
    let name = param.name,
        country_id = param.country_id,
        creater = param.creater;
    next({
        $promise: RegionService.addRegion(name, country_id, creater),
        msg: '区域添加失败'
    });
});
//查询洲
router.post('/findstatelist', (req, res, next)=> {
    next({
        $promise:RegionService.findStateList(),
        msg: '洲查询失败'
    });
});
//查询国家
router.post('/findcountrylist', (req, res, next)=> {
    let param = req.body;
    let page = param.page;
    next({
        $promise:RegionService.findCountryList(page),
        msg: '国家查询失败'
    });
});
//查询区域列表
router.post('/findregionlist', (req, res, next)=> {
    let page = req.body.page;
    next({
        $promise:RegionService.findRegionList(page),
        msg: '区域查询失败'
    });
});
//通过洲查询国家
router.post('/findcountrytostate', (req, res, next)=> {
    let state_id = req.body.state_id;
    next({
        $promise:RegionService.findCountryToState(state_id),
        msg: '国家查询失败'
    });
});
//通过国家查询区域
router.post('/findregiontocountry',(req, res, next)=> {
    let country_id = req.body.country_id;
    next({
        $promise:RegionService.findRegionToCountry(country_id),
        msg: '区域查询失败'
    });
});
//编辑大洲
router.post('/editstate', (req, res, next)=> {
    let param = req.body;
    let state_id = param.state_id,
        name = param.name,
        modifier = param.modifier;
    next({
        $promise:RegionService.editState(state_id, name, modifier),
        msg: '编辑大洲失败'
    });
});

//编辑国家
router.post('/editcountry', (req, res, next)=> {
    let param = req.body;
    let country_id = param.country_id,
        name = param.name,
        state_id = param.state_id,
        modifier = param.modifier;
    next({
        $promise:RegionService.editCountry(country_id,name,state_id,modifier),
        msg: '编辑国家失败'
    });
});
//编辑区域
router.post('/editregion',(req,res,next)=>{
    let param = req.body;
    let region_id = param.region_id,
        name = param.name,
        country_id = param.country_id,
        modifier = param.modifier;
    next({
        $promise:RegionService.editRegion(region_id,name,country_id,modifier),
        msg: '编辑区域失败'
    });
});
export default router;