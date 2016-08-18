import express from "express";
import {RegionService} from './../../../service/manage';
const router = express.Router();
//添加大洲
router.post('/addstate', (req, res, next)=> {
    let param = req.body;
    let name = param.name,
        creater = param.creater;
    RegionService.addState(name, creater).then(result=> {
        next(result);
    }).catch(e=> {
        console.log(e);
        res.json({code: 1000, message: "洲添加失败"});
    })
});
//添加国家
router.post('/addcountry', (req, res, next)=> {
    let param = req.body;
    let name = param.name,
        state_id = param.state_id,
        creater = param.creater;
    RegionService.addCountry(name, state_id, creater).then(result=> {
        next(result);
    }).catch(e=> {
        console.log(e);
        res.json({code: 1000, message: "洲添加失败"});
    })
});
//添加区域
router.post('/addregion', (req, res, next)=> {
    let param = req.body;
    let name = param.name,
        country_id = param.country_id,
        creater = param.creater;
    RegionService.addRegion(name, country_id, creater).then(result=> {
        next(result);
    }).catch(e=> {
        console.log(e);
        res.json({code: 1000, message: "洲添加失败"});
    })
});
//查询洲
router.post('/findstatelist', (req, res, next)=> {
    RegionService.findStateList().then(result=> {
        next(result);
    }).catch(e=> {
        console.log(e);
        res.json({code: 1000, message: "洲查询失败"});
    });
});
//查询国家
router.post('/findcountrylist', (req, res, next)=> {
    let param = req.body;
    let page = param.page;
    RegionService.findCountryList(page).then(result=> {
        next(result);
    }).catch(e=> {
        console.log(e);
        res.json({code: 1000, message: "国家查询失败"});
    });
});
//查询区域列表
router.post('/findregionlist', (req, res, next)=> {
    let page = req.body.page;
    RegionService.findRegionList(page).then(result=> {
        next(result);
    }).catch(e=> {
        console.log(e);
        res.json({code: 1000, message: "区域查询失败"});
    });
});
//通过洲查询国家
router.post('/findcountrytostate', (req, res, next)=> {
    let state_id = req.body.state_id;
    RegionService.findCountryToState(state_id).then(result=> {
        next(result);
    }).catch(e=> {
        console.log(e);
        res.json({code: 1000, message: "国家查询失败"});
    })
});
//通过国家查询区域
router.post('/findregiontocountry',(req, res, next)=> {
    let country_id = req.body.country_id;
    RegionService.findRegionToCountry(country_id).then(result=> {
        next(result);
    }).catch(e=> {
        console.log(e);
        res.json({code: 1000, message: "区域查询失败"});
    })
});
//编辑大洲
router.post('/editstate', (req, res, next)=> {
    let param = req.body;
    let state_id = param.state_id,
        name = param.name,
        modifier = param.modifier;
    RegionService.editState(state_id, name, modifier).then(result=> {
        next(result);
    }).catch(e=> {
        console.log(e);
        res.json({code: 1000, message: "大洲查询失败"});
    });
});

//编辑国家
router.post('/editcountry', (req, res, next)=> {
    let param = req.body;
    let country_id = param.country_id,
        name = param.name,
        state_id = param.state_id,
        modifier = param.modifier;
    RegionService.editCountry(country_id,name,state_id,modifier).then(result=> {
        next(result);
    }).catch(e=> {
        console.log(e);
        res.json({code: 1000, message: "大洲查询失败"});
    });
});
//编辑区域
router.post('/editregion',(req,res,next)=>{
    let param = req.body;
    let region_id = param.region_id,
        name = param.name,
        country_id = param.country_id,
        modifier = param.modifier;
    RegionService.editRegion(region_id,name,country_id,modifier).then(result=> {
        next(result);
    }).catch(e=> {
        console.log(e);
        res.json({code: 1000, message: "大洲查询失败"});
    });
});
export default router;